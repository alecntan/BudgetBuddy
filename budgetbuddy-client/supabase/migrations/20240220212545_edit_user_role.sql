create policy "Profiles can be edited by Admin Users"
on profiles
for update
to authenticated
using ( get_my_claim('budget_buddy_role') = '"admin"' );

create or replace function public.update_user_role() 
returns trigger
language plpgsql
security definer
set search_path = public
as $$
    begin
        perform public.delete_claim(new.id, 'budget_buddy_role'::text);
        perform public.set_claim(new.id, 'budget_buddy_role'::text, to_jsonb(new.user_role));
        if new.user_role = 'admin' then
            perform public.set_claim( new.id, 'claims_admin'::text, 'true');
        else
            if old.user_role = 'admin' then
                perform public.delete_claim( new.id, 'claims_admin' );
            end if;
        end if;

        return new;
    end;
$$;

create or replace trigger on_edit_user_role
after update of user_role on public.profiles
for each row execute procedure public.update_user_role();
