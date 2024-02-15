alter default priveleges revoke execute on functions from public;

create or replace function is_budget_buddy_admin() returns "bool"
language "plpgsql" as $$
    begin
        return get_my_claim('budget_buddy_role') = '"admin"';
    end;
$$;

grant execute on function is_budget_buddy_admin to authenticated;
grant execute on function is_budget_buddy_admin to service_role;

create or replace function is_budget_buddy_director() returns "bool"
language "plpgsql" as $$
    begin
        return get_my_claim('budget_buddy_role') = '"director"';
    end;
$$;

grant execute on function is_budget_buddy_director to authenticated;
grant execute on function is_budget_buddy_director to service_role;

create or replace function is_budget_buddy_manager() returns "bool"
language "plpgsql" as $$
    begin
        return get_my_claim('budget_buddy_role') = "'manager'";
    end;
$$;

grant execute on function is_budget_buddy_manager to authenticated;
grant execute on function is_budget_buddy_manager to service_role;

create or replace function is_budget_buddy_associate() returns "bool"
language "plpgsql" as $$
    begin
        return get_my_claim('budget_buddy_role') = "'associate'";
    end;
$$

grant execute on function is_budget_buddy_associate to authenticated;
grant execute on function is_budget_buddy_associate to service_role;

