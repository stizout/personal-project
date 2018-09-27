
create table users (
    id serial primary key,
    name text,
    address text,
    email text,
    date_joined date
)

create table products (
    id serial primary key,
    name text,
    SKU int,
    mini text,
    price decimal,
    description text,
    image text,
    likes int
)

create table orders (
    id serial primary key,
    user_id int references users(id),
    -- product_id int references products(id)
)
create table order (
    id primary key serial,
    product_id int references products(id)
    order_id int references orders(id)
    
)

create table addresses (
    id serial primary key,
    street text,
    city text,
    state text,
    zip int,
    user_id int references users(id)
)


insert into products 
(name, SKU, mini, price, description, image, likes)
values
('Jack Links Teriyaki Beef Jerky', 10001, '12g of Protein & 80 Calories per serving!', 9.99, 'Feed your wild side. Smoked, slow cooked and served in a bag that’s certain to be the most delicious snack in your adventuring satchel. Soy, ginger, a little onion and a whole lot of perfectly smoked beef. The very best of East meets West.', 'https://res.cloudinary.com/dvvwg1hp3/image/upload/f_auto/v1532450604/Teriyaki-beef-jerky-bag.jpg', 12 ),
('Vanilla Coke', 10002, '12 x 12 oz cans', 4.99, 'Coca-Cola is the most popular and biggest-selling soft drink in history, as well as one of the most recognizable brands in the world.', 'https://res.cloudinary.com/dvvwg1hp3/image/upload/f_auto/v1532450604/vanilla-coke.jpg', 20 ),
('Pringles Cheddar Cheese', 10003, 'Can of potato chips', 2.50, 'Pringles first flavor, the pride and joy, the one that first was made in that iconic shape that perfectly stacks into that unique tubular can. You know that can, the one that you cant reach into the bottom of unless you have hands like shrimp forks.', 'http://res.cloudinary.com/dvvwg1hp3/image/upload/f_auto/v1532450604/pringles-cheedar.jpg', 5 ),
('Planters Mixed Nuts', 10004, 'Peanuts, Almonds, Cashews & Hazelnuts', 3.75, 'Since 1906, Planters has taken pride in offering a wide variety of delicious products. Mixed Nuts are great for parties or any occasion, they are are a good natural source of essential proteins and vitamins. Your shell is your temple so harness the power of the mixed nut!', 'https://res.cloudinary.com/dvvwg1hp3/image/upload/f_auto/v1532450604/Planters-Mixed-Nuts.jpg', 8 ),
('Pringles Original', 10005, 'Can of potato chips', 2.25, 'Pringles first flavor, the pride and joy, the one that first was made in that iconic shape that perfectly stacks into that unique tubular can. You know that can, the one that you cant reach into the bottom of unless you have hands like shrimp forks.', 'https://res.cloudinary.com/dvvwg1hp3/image/upload/f_auto/v1532450604/pringles-original.jpg', 22 ),
('Pop Tarts Oreo', 10006, '8 bags of 2 Pop Tarts', 1.99, 'Start off each and every morning with a pop! Toasted or straight out of the box, this Kelloggs Pop-Tarts Variety Pack comes with three delicious frosted flavors in one convenient package! Celebrate all that is special about Pop-Tarts the filling and frosting that dazzles your taste buds and makes us dance with delight. Cholesterol Free.', 'https://res.cloudinary.com/dvvwg1hp3/image/upload/f_auto/v1532450604/pop-tarts-oreo.jpg', 32 ),
('Pop Tarts Strawberry', 10007, '6 bags of 2 Pop Tarts', 1.25, 'Start off each and every morning with a pop! Toasted or straight out of the box, this Kelloggs Pop-Tarts Variety Pack comes with three delicious frosted flavors in one convenient package! Celebrate all that is special about Pop-Tarts the filling and frosting that dazzles your taste buds and makes us dance with delight. Cholesterol Free.', 'https://res.cloudinary.com/dvvwg1hp3/image/upload/f_auto/v1532450604/pop-tarts-strawberry.jpg', 10 ),
('Lays Potato Chips Original', 10008, '10 Servings of Original Chips', 3.20, 'Wherever celebrations and good times happen, the Lays brand will be there just as it has been for more than 75 years. With flavors almost as rich as their history, Lays has a chip or crisp flavor guaranteed to bring a smile on your face.', 'https://res.cloudinary.com/dvvwg1hp3/image/upload/f_auto/v1532450603/lays-classic.jpg', 43 ),
('Pepperidge Farm Goldfish', 10009, '58 oz of cheddar cheese crackers', 5.50, 'Everyone loves Goldfish crackers--tasty, fun, wholesome treats. The Snack that Smiles Back. Pepperidge Farm Goldfish have 0g trans fat, are all natural, have no artificial preservatives and are baked with real cheddar cheese! Keep everyone happy with Goldfish crackers in multi-packs. Toss them into lunchboxes, party goody bags or backpacks.', 'https://res.cloudinary.com/dvvwg1hp3/image/upload/f_auto/v1532450603/goldfish.jpg', 87 ),
('Planters Cocktail Peanuts', 10010, '24 oz of Cocktail Peanuts', 3.99, 'Since 1906, Planters has taken pride in offering a wide variety of delicious products. Thanks to an unparalleled commitment to quality and the support of their loyal nut fans, Planters continues to produce remarkable snacks that you will love.', 'https://res.cloudinary.com/dvvwg1hp3/image/upload/f_auto/v1532450603/planters-nuts-peanuts.jpg', 16 ),
('Jack Links Original Beef Jerky', 10011, '10g of Protein & 80 Calories per serving!', 9.99, 'Feed your wild side. Smoked, slow cooked and served in a bag that’s certain to be the most delicious snack in your adventuring satchel. Soy, ginger, a little onion and a whole lot of perfectly smoked beef. The very best of East meets West.', 'https://res.cloudinary.com/dvvwg1hp3/image/upload/f_auto/v1532450603/original-beef-jerky_bag.png', 13 ),
('Kraft Macaroni & Cheese', 10012, '18 7.25 oz boxes of Macaroni', 14.20, 'Whether cuddling up for a movie night with the kids or getting through their next playdate, Kraft macaroni & cheese helps you cook up a tummy-full of good times.', 'https://res.cloudinary.com/dvvwg1hp3/image/upload/f_auto/v1532450603/Kraft-mac-and-cheese.jpg', 11 ),
('Kraft Macaroni & Cheese Cups', 10013, '12 2oz cups of Macaroni', 9.50, 'Whether cuddling up for a movie night with the kids or getting through their next playdate, Kraft macaroni & cheese helps you cook up a tummy-full of good times.', 'https://res.cloudinary.com/dvvwg1hp3/image/upload/f_auto/v1532450603/Kraft-mac-and-cheese-cups.png', 17 ),
('Mountain Dew Original 12pk', 10014, '12 12fl oz cans of Mountain Dew', 4.99, 'Mountain Dew is a carbonated soft drink brand produced and owned by PepsiCo. The original formula was invented in 1940 by Tennessee beverage bottlers Barney and Ally Hartman.', 'https://res.cloudinary.com/dvvwg1hp3/image/upload/f_auto/v1532450603/mountain-dew.jpg', 99 ),
('Doritos Nacho Cheese', 10015, 'Nacho Cheese tortilla chips by Frito Lay', 3.12, 'The Doritos brand is all about boldness. If you’re up to the challenge, grab a bag of Doritos tortilla chips and get ready to make some memories you won’t soon forget. It’s a bold experience in snacking and beyond.', 'https://res.cloudinary.com/dvvwg1hp3/image/upload/f_auto/v1532450602/doritos-chips.jpg', 52 ),
('Windex', 20001, 'Window cleaner', 1.24, 'For a Beautiful Streak-Free Shine, Windex Original is America’s #1 glass cleaner—for good reason. Trusted by generations for its famous streak-free shine, Windex Original is perfect for cleaning glass and a whole lot more. Thanks to its key ingredient, Ammonia-D, Windex Original starts working on dirt even before you wipe.', 'https://res.cloudinary.com/dvvwg1hp3/image/upload/f_auto/v1532450604/windex.jpg', 3 ),
('Tide Pods', 20002, '81 capsuls', 9.99, 'Tide Pods deliver detergent, stain remover and brightener in one. Innovative, multi-chamber design separates ingredients until they hit the wash for outstanding cleaning power. Keep your clothes Tide fresh with the complete care of Tide Pods Detergent. One self-enclosed pack will clean one load of laundry. You will never have to worry about measuring detergent again with this Tide Pods Detergent. This special Tide detergent is an all-in-one laundry pod that works with whites and color loads.', 'https://res.cloudinary.com/dvvwg1hp3/image/upload/f_auto/v1532450604/tide-pods.png', 2 ),
('Scotch-Brite Sponges', 20003, '21 Sponges per package', 5.20, 'Effective cleaning without scratching. Ideal for non-stick cookware. Comes in a comfortable, easy-to-hold shape. Simply sanitize in the dishwasher and reuse!', 'https://res.cloudinary.com/dvvwg1hp3/image/upload/f_auto/v1532450604/sponges.jpg', 4 ),
('Febreze Air Freshener', 20004, 'Spray of Hawaiian fresh air', 2.68, 'Is the festering takeout in 3C over-powering? Febreze is tougher, it doesnt just freshen the air, it actually eliminates odors. Just a simple spray sweeps away odors, from everyday pet and bathroom smells to stubborn smoke and last night’s lingering food leftovers. With Febreze Air Effects, you can kick odors out and invite freshness in. You can use this odor-eliminating air freshener in cars, homes and workplaces. Spray it! to knock out odors and discover over a Febillion uses!', 'https://res.cloudinary.com/dvvwg1hp3/image/upload/f_auto/v1532450603/febreeze-airfreshener.jpg', 32 ),
('Glade Air Freshener', 20005, 'Block of scented wax', 1.25, 'Relax as a unique blend of two amazing scents quickly fill the room, forming a unique fusion of fragrance for your home. Each redesigned candle comes in a wide variety of scents and lasts up to 30 hours.', 'https://res.cloudinary.com/dvvwg1hp3/image/upload/f_auto/v1532450603/glade-freshener.jpg', 12 ),
('Bounty Paper Towels', 20006, '15 Rolls of Paper Towels', 9.50, 'Bounty Select-a-Size Mega Rolls now have even more sheets, equivalent to 20 rolls! Locks in the mess with less - select-a-size gives you the choice to use smaller sheets for more control.', 'https://res.cloudinary.com/dvvwg1hp3/image/upload/f_auto/v1532450602/bounty-papertowels.jpg', 16 ),
('Formula 409', 20007, 'All Purpose Cleaner', 3.99, 'Cleaner eliminates viruses, bacteria, soap scum, and tough grease.Cuts tough grease, removes soap scum deodorizes, and kills 99.9% of Germs', 'https://res.cloudinary.com/dvvwg1hp3/image/upload/f_auto/v1532450602/formula-409.png', 19 ),
('Glad ForceFlex Bags', 20008, '70 Large Trash Bags', 6.24, 'Nothing leaves us angrier than a messy garbage bag that shreds as you lift it! Get Glad ForceFlex - the ultimate bag with stretchable strength. Glad ForceFlex bag’s unique Diamond Texture stretches to prevent rips and tears.', 'https://res.cloudinary.com/dvvwg1hp3/image/upload/f_auto/v1532450602/glad-bags.jpg', 22 ),
('Cascade Dishwasher Pods', 20009, '80 Pods, 80 loads of dishes', 10.20, 'The clean team you trust. While you can trust certain meals to please a crowd, Cascade ActionPacs with the Grease Fighting Power of Dawn can be trusted to clean a fully loaded dishwasher the first time around. Put simply, the power of teamwork pays off!', 'https://res.cloudinary.com/dvvwg1hp3/image/upload/f_auto/v1532450602/cascade-pods.jpg', 21 ),
('Cottonelle Flushable Wipes', 20010, '12 bags of 168 wipes', 9.99, 'Flushable Cleansing Cloths will leave you feeling fresh & clean from top to bottom. Prince & Spring provides customers with the finest choice in their everyday purchases. Our products will delight smart shoppers who appreciate quality and style.', 'https://res.cloudinary.com/dvvwg1hp3/image/upload/f_auto/v1532450602/cottonelle-wipes.jpg', 18 ),
('Bounce Dryer Sheets', 20011, '240 Sheets to eliminate wrinkles and static', 4.99, 'Bounce Dryer Sheets keep your clothes, towels and bedding soft and static-free. Relish the scent of fresh laundry right out the dryer and be delighted by the clean scent that lasts throughout the day.', 'https://res.cloudinary.com/dvvwg1hp3/image/upload/f_auto/v1532450602/bounce-sheets.jpg', 22 ),
('Drano Max Gel', 20012, 'Clear total blockages Guarenteed', 8.99, 'Safe on metal & plastic pipes! Drano Max Gel pours through standing water and works fast to clear clogged drains and restore them to a free-flowing state. Safe for all pipes, it works great to remove hair, soap scum, and other gunky clogs.', 'https://res.cloudinary.com/dvvwg1hp3/image/upload/f_auto/v1532450602/drano.jpg', 32 ),
('Kirkland Puppy Pads', 30001, 'Extra-Large Absorbant Pads', 12.99, 'Kirkland Signature Extra-Large Absorbent Pads lock in wetness with a quilted top layer for around the clock odor control. The poly backing protects against leaks, and the quick absorption reduces splash and tracking. Use for training, bedding and messy jobs.', 'https://res.cloudinary.com/dvvwg1hp3/image/upload/f_auto/v1532455484/puppy-pads.jpg', 63 ),
('MORE Flavor Treats', 30002, '3lbs of Dog Treats', 7.99, 'MORE Flavors treats are perfect for any pooch that believes variety is the spice of life. Blue Dog’s low fat treats are baked with an extra crunch to help clean teeth and freshen breath.', 'https://res.cloudinary.com/dvvwg1hp3/image/upload/f_auto/v1532455484/dog-treats.jpg', 30 ),
('Stainmaster Carpet Pet Stain', 30003, '44oz bottle of carpet cleaner', 4.99, 'From America’s most trusted brand in carpet. STAINMASTER’s multi-action system: Begins to CLEAN pet stains on contact, penetrates deep to LIFT out tough pet stains, REPELS dirt with InvisiTech by leaving behind an invisible shield to protect against resoiling, ELIMINATES odors with powerful ODOR REMOVE technology and freshens with a light, clean scent.', 'https://res.cloudinary.com/dvvwg1hp3/image/upload/f_auto/v1532455828/stain.jpg', 71 ),
('Purina One Cat Food', 30004, '16lbs of Tender Selects Blend', 23.99, 'The nutrition you give your cat every day plays an important role in how your cat looks and feels. Purina ONE dry cat food is formulated with real chicken as the #1 ingredient, blended with other high-quality protein sources, to help support strong muscles, including a healthy heart.', 'https://res.cloudinary.com/dvvwg1hp3/image/upload/f_auto/v1532455484/cat-food.jpg', 22 ),
('Boxed Dog Toy', 30005, 'Dog Toy made with quality', 7.99, 'As sniffed on Shark Tank! PrideBites pet products are designed with you in mind. Our office pooches Maui, CJ, Onyx, Stanlee, Hudson, Charlie, JackJack, RiceBall, Caesar, Maggie and Lila all have had hours of fun with the official Boxed Squeaky toy. Our best friends love it and yours will too!', 'https://res.cloudinary.com/dvvwg1hp3/image/upload/f_auto/v1532455484/dog-toy.jpg', 11 ),
('Blue Dog Bakery Deli Sticks', 30006, 'All Natural Beef Sticks, 16oz', 18.99, 'Made with 100% premium USA beef and simple, all natural ingredients, Blue Dog Deli Sticks are free of all artificial flavors and colors, artificial preservatives, and animal by-products. Simply clean and healthy treats for your dogs that are are packed with protein (2.5 grams per stick!) and made without corn, wheat, soy, or fillers.', 'https://res.cloudinary.com/dvvwg1hp3/image/upload/f_auto/v1532455484/blue-dog-treats.png', 15 ),
('PrideBites Sunday Pawty', 30008, 'Three toys your friend will love', 18.99, 'Everyone loves pizza, beer, and steak especially members of the canine family. Now you can give your dog all 3 without cleaning up the inevitable mess. These toys squeak and float, and you dont even have to worry about the crust getting soggy. The best part is The Five Second food rule doesnt apply here! When your toys get dirty just throw them in with the laundry, because they are machine washable.', 'https://res.cloudinary.com/dvvwg1hp3/image/upload/f_auto/v1532455485/pizza-toy.jpg', 14 ),
('Frontline Plus for Cats', 30009, 'Kills fleas, flea egg & larvae, ticks and lice', 88.99, 'Frontline Plus provides fast, effective and convenient treatment to kill fleas and ticks, including those that transmit Lyme disease. Starts working within 24 hours, plus, decimates flea eggs and larvae.', 'https://res.cloudinary.com/dvvwg1hp3/image/upload/f_auto/v1532455484/frontline-plus.jpg', 10 ),
('Greenies Dental Treats', 30010, '130 Teenie Sticks for Dogs', 38.99, 'The Original Smart Treat - Total Oral Solution. Greenies Dental Chews are the #1 veterinarian-recommended dental chews and clinically proven to provide a total oral health solution.', 'https://res.cloudinary.com/dvvwg1hp3/image/upload/f_auto/v1532455484/dog-sticks.jpg', 26 ),
('Bark+ Waste Bags', 30011, '50 rolls / 1,000 bags', 11.99, 'No more looking for the perforation line when you are walking at night. The patented dispenser also stops the roll of pickup bags from unraveling, so extra bags will not be dangling off. No other bag or dispensers have this functionality. Try it out now!! Errr, let your dog try it out.', 'https://res.cloudinary.com/dvvwg1hp3/image/upload/f_auto/v1532455485/waste-bags.jpg', 28 )

