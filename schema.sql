create table user(
    id serial primary key,
    name text,
    first_name text,
    last_name text,
    email varchar,
    phone_number varchar(20),
    location varchar(20)

   
);
create table breed (
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
    location varchar(20);
    color text,
    gender varchar(1),
    size text,
    pet_description text,
    user_id integer references pets(id),
    breed_id integer references breed(id)
);

create table adoption_status (
    id serial primary key,
    is_looking_for varchar(1),
    is_adopting_out varchar(1),
    user_id integer references user(id)

     
);
