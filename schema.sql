create table users (
    id serial primary key,
    user_name text,
    hash text,
    first_name text,
    last_name text,
    email varchar(20),
    phone_number varchar(20),
    user_location text
);

create table breeds (
    id serial primary key,
    name text,
    breed_species text,
    breed_description text 
);

create table pets (
    id serial primary key,
    name text,
    picture text,
    species text,
    birthdate date,
    pet_location text,
    color text,
    gender varchar(1),
    size text,
    pet_description text,
    user_id integer references users (id),
    breed_id integer references breeds (id)
);

create table adoption_status (
    id serial primary key,
    is_looking_for varchar(1),
    is_adopting_out varchar(1),
    user_id integer references users (id) 
);
