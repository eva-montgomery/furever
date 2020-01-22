insert into users 
    (user_name, hash, first_name, last_name, email, phone_number, user_location)
values
    ('Barbara', '7263826', 'Barbara', 'Hoe', 'bhoe@hoes.com', '770-083-8473', 'Atlanta'),  
    ('Fred', '7263828', 'Fred', 'Teaspoon', 'fredtea@spoon.com', '982-987-2343', 'Decatur'),  
    ('Molly', '7263756', 'Molly', 'Burns', 'mburns@molly.net', '398-928-7653', 'Houston'),  
    ('Sandra', '77665826', 'Sandra', 'Fries', 'san_fries@game.com', '666-873-0092', 'New York'),  
    ('David', '7246426', 'David', 'Crow', 'dcrow@ddcrow.com', '635-963-2654', 'New York'),  
    ('Karen', '7527536', 'Karen', 'Cake', 'loveacake@karen.com', '222-313-7653', 'Atlanta'),  
    ('Brandon', '77652326', 'Brandon', 'Walsh', 'walsh_br@bwalsh.com', '763-096-3482', 'Los Angeles'),  
    ('Tina', '7764653', 'Tina', 'Turner', 'tturner@turner.com', '836-743-8624', 'Dallas'),  
    ('Dawson', '7754676', 'Dawson', 'Creek', 'dawson@creek.net', '763-8663-8665', 'Atlanta'),  
    ('Mary', '6537326', 'Mary', 'Coolson', 'maryiscool@mcool.com', '653-8768-5647', 'Atlanta')
;


insert into breeds
    (name, breed_species, breed_description)
values
    ('dog', 'Pomeranian', 'The tiny Pomeranian, long a favorite of royals and commoners alike, has been called the ideal companion. The glorious coat, smiling, foxy face, and vivacious personality have helped make the Pom one of the world`s most popular toy breeds. About the Pomeranian: The Pomeranian combines a tiny body (no more than seven pounds) and a commanding big-dog demeanor. The abundant double coat, with its frill extending over the chest and shoulders, comes in almost two dozen colors, and various patterns and markings, but is most commonly seen in orange or red. Alert and intelligent, Pomeranians are easily trained and make fine watchdogs and perky pets for families with children old enough to know the difference between a toy dog and a toy. Poms are active but can be exercised with indoor play and short walks, so they are content in both the city and suburbs. They will master tricks and games with ease, though their favorite activity is providing laughs and companionship to their special human.'),
    ('dog', 'Dachshund', 'The famously long, low silhouette, ever-alert expression, and bold, vivacious personality of the Dachshund have made him a superstar of the canine kingdom. Dachshunds come in two sizes and in three coat types of various colors and patterns. The word “icon” is terribly overworked, but the Dachshund—with his unmistakable long-backed body, little legs, and big personality—is truly an icon of purebred dogdom. Dachshunds can be standard-sized (usually 16 to 32 pounds) or miniature (11 pounds or under), and come in one of three coat types: smooth, wirehaired, or longhaired. Dachshunds aren’t built for distance running, leaping, or strenuous swimming, but otherwise these tireless hounds are game for anything. Smart and vigilant, with a big-dog bark, they make fine watchdogs. Bred to be an independent hunter of dangerous prey, they can be brave to the point of rashness, and a bit stubborn, but their endearing nature and unique look has won millions of hearts the world over.'),
    ('dog', 'Golden Retriever', 'The Golden Retriever, an exuberant Scottish gundog of great beauty, stands among America’s most popular dog breeds. They are serious workers at hunting and field work, as guides for the blind, and in search-and-rescue, enjoy obedience and other competitive events, and have an endearing love of life when not at work. The Golden Retriever is a sturdy, muscular dog of medium size, famous for the dense, lustrous coat of gold that gives the breed its name. The broad head, with its friendly and intelligent eyes, short ears, and straight muzzle, is a breed hallmark. In motion, Goldens move with a smooth, powerful gait, and the feathery tail is carried, as breed fanciers say, with a “merry action.” The most complete records of the development of the Golden Retriever are included in the record books that were kept from 1835 until about 1890 by the gamekeepers at the Guisachan (pronounced Gooeesicun) estate of Lord Tweedmouth at Inverness-Shire, Scotland. These records were released to public notice in Country Life in 1952, when Lord Tweedmouth’s great-nephew, the sixth Earl of Ilchester, historian and sportsman, published material that had been left by his ancestor. They provided factual confirmation to the stories that had been handed down through generations. Goldens are outgoing, trustworthy, and eager-to-please family dogs, and relatively easy to train. They take a joyous and playful approach to life and maintain this puppyish behavior into adulthood. These energetic, powerful gundogs enjoy outdoor play. For a breed built to retrieve waterfowl for hours on end, swimming and fetching are natural pastimes.'),
    ('dog', 'Corgi', 'Among the most agreeable of all small housedogs, the Pembroke Welsh Corgi is a strong, athletic, and lively little herder who is affectionate and companionable without being needy. They are one of the world`s most popular herding breeds. At 10 to 12 inches at the shoulder and 27 to 30 pounds, a well-built male Pembroke presents a big dog in a small package. Short but powerful legs, muscular thighs, and a deep chest equip him for a hard day’s work. Built long and low, Pembrokes are surprisingly quick and agile. They can be red, sable, fawn, and black and tan, with or without white markings. The Pembroke is a bright, sensitive dog who enjoys play with his human family and responds well to training. As herders bred to move cattle, they are fearless and independent. They are vigilant watchdogs, with acute senses and a “big dog” bark. Families who can meet their bold but kindly Pembroke’s need for activity and togetherness will never have a more loyal, loving pet.'),
    ('dog', 'American Bulldog', 'Kind but courageous, friendly but dignified, the Bulldog is a thick-set, low-slung, well-muscled bruiser whose “sourmug” face is the universal symbol of courage and tenacity. These docile, loyal companions adapt well to town or country. You can’t mistake a Bulldog for any other breed. The loose skin of the head, furrowed brow, pushed-in nose, small ears, undershot jaw with hanging chops on either side, and the distinctive rolling gait all practically scream “I’m a Bulldog!” The coat, seen in a variety of colors and patterns, is short, smooth, and glossy. Bulldogs can weigh up to 50 pounds, but that won’t stop them from curling up in your lap, or at least trying to. But don’t mistake their easygoing ways for laziness—Bulldogs enjoy brisk walks and need regular moderate exercise, along with a careful diet, to stay trim. Summer afternoons are best spent in an air-conditioned room as a Bulldog’s short snout can cause labored breathing in hot and humid weather.')
;    


insert into pets
    (name, image, species, birthdate, pet_location, color, gender, size, pet_description, user_id, breed_id)
values
    ('Princess', 'princess.jpg', 'dog', '2015-10-09', 'Atlanta', 'red', 'F', 'small', 'Hi my name is Princess and I am a sweet little Pomeranian girl with the temper of a big dog. I love snuggles and playing with my toys. I really do not like other dogs that much but I do love kitty cats. I think they are great to play with. My current owner unfortunately got knocked up with 3 pairs of twins since I was born and she is not able to give me the love I deserve. Also, I do not like to share my toys with little humans.', 2, 3),

    ('Tinkerbell', 'tinkerbell.jpg', 'dog', '2019-06-18', 'Houston', 'brown', 'F', 'small', 'I have always known the secret to happiness is gratitude. I just do not understand why I always get called weiner? Do I look like a guy? Uhhm hello, I am a pretty little woman and I deserve to get treated like one! In return I will give you unconditional love! My human brother has some kind of issues and I do not feel safe being around him. Please help a sista out!', 1, 3),
   
    ('PeterPan', 'peterpan.jpg', 'dog', '2009-03-01', 'New York', 'tan', 'M', 'large', 'Are you looking for a bad boy? Then you’re in luck, I’m bad at everything. Just kidding! I am named PeterPan for a good reason. Why you ask? Because I love kids! They are awesome, they play with me all day, share their food with me and I am almost never by myself for a long peridod of time. Since I am a nice guy I also let them sleep in the bed with me. I am technically already what they call a senior but I have the spirit of a young pup (PeterPan duh!). All my human siblings have left the nest and I feel lonely without them. Mom said, I can also move out if I find new human siblings that look after me.', 2, 3),

    ('Pretzel', 'pretzel.jpg', 'dog', '2010-11-12', 'Decatur', 'white/tan', 'M', 'mid-sized', 'Looking for a badass. I already have a good ass! The way I wiggle my cute little butt when I walk through the dog park does not only make 4-legged men turn around! I also make a great wingman by the way since I want to meet everyone I see on the street. My mama works in a smokey place all night and she likes to bring home different humans which I do not agree with. I do not like to be by myself, especially when it is dark outside. Therefore, I am looking for a new mom or dad!', 4, 5),

    ('Manny', 'manny.jpg', 'dog', '2018-10-02', 'Decatur', 'white/black', 'M', 'mid-sized', 'Sorry ladies (or gentlemen), I do not have the dad bod you want, but I do have the couch potato qualities you are secretely seeking for! I will happily share my pizza (that you of course buy) with you, if you give me the belly rubs I demand. I am a laid back kind of dude and prefer evenings on the couch with my human over hanging out with other pups at the dog park. My `player` games are over so I will leave that to the younger folks. My current human aged so quickly he shriveled up into an old man skeleton thing before he turned into dust and died a swift yet horrifying death.', 4, 5)
   ;

insert into adoption_status
    (user_id, is_looking_for, is_adopting_out)
values  
    (3, 1, 0),
    (2, 1, 0),
    (5, 0, 1),
    (1, 1, 0),
    (8, 0, 1),
    (7, 1, 0)
    ;
