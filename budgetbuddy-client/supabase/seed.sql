insert into auth.users(
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    recovery_sent_at,
    last_sign_in_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    confirmation_token,
    email_change,
    email_change_token_new,
    recovery_token
) values (

    '00000000-0000-0000-0000-000000000000',
	'65ef5345-21a6-44d8-989b-d4816ce04dde',
    'authenticated',
    'authenticated',
    'user@example.com',
    crypt ('password123', gen_salt('bf')),
    current_timestamp,
    current_timestamp,
    current_timestamp,
    '{"provider":"email","providers":["email"]}',
    '{}',
    current_timestamp,
    current_timestamp,
    '',
    '',
    '',
    ''
);

insert into public.profiles(
    id,
    first_name,
    last_name,
    user_role
) values (
	'65ef5345-21a6-44d8-989b-d4816ce04dde',
    'John',
    'Smith',
    'admin'
);


