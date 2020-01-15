-- insert into user 
--     (name, first_name, last_name, email, phone_number, location)
-- values
--     ('chris', '8675309'),
--     ('aylor', '5554321');


insert into pets
    (name, picture, species, birthdate, loction, color, gender, size, pet_description, user_id, breed_id)
values
    ('Princess','princes.jpg' 'dog', '2015-10-09', 'Atlanta', 'red', 'F', 'small', 'Hi my name is Princess and I am a sweet little Pomeranian girl with the temper of a big dog. I love snuggles and playing with my toys. I really do not like other dogs that much but I do love kitty cats. I think they are great to play with. My does not get along well with other dogs but she does get along with cats. My current owner unfortunately got knocked up with 3 pairs of twins since I was born and she is not able to give me the love I deserve. Also, I do not like to share my toys with little humans.', 2, 3),

    ('Tinkerbell','tinkerball.jpg' 'dog', '2019-06-18', 'Huston', 'brown', 'F', 'small', 'I have always known the secret to happiness is gratitude. I just do not understand why I always get called weiner? Do I look like a guy? Uhhm hello, I am a pretty little woman and I deserve to get treated like one! In return I will give you unconditional love! My human brother has some kind of issues and I do not feel safe being around him. Please help a sista out!', 1, 3),
   
    ('PeterPan','peterpan.jpg' 'dog', '2009-03-01', 'New York', 'golden', 'M', 'large', 'Are you looking for a bad boy? Then you’re in luck, I’m bad at everything. Just kidding! I am named PeterPan for a good reason. Why you ask? Because I love kids! They are awesome, they play with me all day, share their food with me and I am almost never by myself for a long peridod of time. Since I am a nice guy I also let them sleep in the bed with me. I am technically already what they call a senior but I have the spirit of a young pup (PeterPan duh!). All my human siblings have left the nest and I feel lonely without them. Mom said, I can also move out if I find new human siblings that look after me. ', 2, 3),

    ('Pretzel','pretzel.jpg' 'dog', '2010-11-12', 'Decatur', 'white/black', 'M', 'mid-sized', 'Looking for a badass. I already have a good ass! The way I wiggle my cute little but when I walk through the dog park does not only make furry men turn around! I also make a great wingman by the way since I want to meet everyone I see on the street. My mama works in a smokey place all night and she likes to bring home different humans which I do not agree with. I do not like to be by myself, especially when it is dark outside. Therefore, I am looking for a new mom or dad!   ', 4, 5),

     ('Manny','manny.jpg' 'dog', '2010-11-12', 'Decatur', 'white/black', 'M', 'mid-sized', 'Sorry ladies ( or gentlemen), I do not have the dad bod you want, but I do have the couch potato qualities you are secretely seeking for! I will happily share my pizza (that you of course buy) with you, if you give me the belly rubs I demand. I am a laid back kind of dude and prefer evenings on the couch with my human over hanging out with other pups at the dog park. My "player" games are over so I will leave that to the younger folks. My current human aged so quickly he shriveled up into an old man skeleton thing before he turned into dust and died a swift yet horrifying death.', 4, 5),
   


insert into breed
    (name, breed_species, breed_description)
values
    ('dog', 'Pomeranian', 'The Pomeranian is a small, square-proportioned, miniature spitz with a cobby, rounded body. '),
    ('dog', 'Dachshund', 'The Dachshund has an energetic, pleasant expression.'),
    ('dog', 'Golden Retriever', 'Goldens are athletic, strong and capable of carrying heavy game over land and water. '),
    ('dog', 'Corgi', 'The Corgi is a breed that needs to be quick and agile.'),
    ('dog', 'American Bulldog', 'The American Bulldog is an energetic, active working dog.')
    


-- insert into pets
--     (name, species, birthdate, owner_id)
-- values
--     ('oakley', 'cat', '2010-05-30', 1),
    