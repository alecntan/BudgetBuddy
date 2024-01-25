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
    'admin@example.com',
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
),
(

    '00000000-0000-0000-0000-000000000000',
	'938c7190-1cac-4079-a955-c255d641ccf2',
    'authenticated',
    'authenticated',
    'director@example.com',
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
),
(

    '00000000-0000-0000-0000-000000000000',
    '986ebb20-e9a9-4f0c-826b-4f3d2c37e4a9',
    'authenticated',
    'authenticated',
    'manager@example.com',
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
),
(

    '00000000-0000-0000-0000-000000000000',
    'b3edfe7c-80f9-45d5-bec6-b2b693038eb5',
    'authenticated',
    'authenticated',
    'associate@example.com',
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
),
(
	'938c7190-1cac-4079-a955-c255d641ccf2',
    'Kento',
    'Nanamin',
    'director'
),
(
    '986ebb20-e9a9-4f0c-826b-4f3d2c37e4a9',
    'Yuta',
    'Okkotsu',
    'manager'
),
(
    'b3edfe7c-80f9-45d5-bec6-b2b693038eb5',
    'Yuji',
    'Itadori',
    'associate'
);
