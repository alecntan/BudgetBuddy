create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
    begin
        insert into public.profiles ( id, first_name, last_name, user_role )
        values ( new.id, new.raw_user_meta_data ->> 'first_name', new.raw_user_meta_data ->> 'last_name', (new.raw_user_meta_data->>'user_role')::role);
        return new;
    end;
$$;

create or replace function public.handle_new_profile () 
returns trigger 
language plpgsql 
security definer
set
  search_path = public as $$
  begin
    perform public.set_claim(new.id, 'budget_buddy_role'::text, to_jsonb(new.user_role));
    if new.user_role = 'admin' then
        perform public.set_claim( new.id, 'claims_admin'::text, 'true');
    end if;
    return new;
  end;
$$;

create or replace trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

create or replace trigger on_new_profiles
after  insert on public.profiles
for each row execute procedure public.handle_new_profile();









