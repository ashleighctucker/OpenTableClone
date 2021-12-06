from app.models import db, Restaurant
import datetime
def seed_users():
    chin_chin = Restaurant(
        name="Chin Chin", location="West Hollywood", price_point=2, phone_number="(310) 652-1818", open_time="12:00 PM", close_time= "9:00 PM", contact_email="null", description="""Coming Soon!Chin Chin® made its debut on Sunset Blvd in Los Angeles in 1983, introducing dim sum and other Chinese favorites prepared using traditional Cantonese cooking techniques. Each dish is made with premium ingredients, fresh-to-order, without adding any MSG, and served in a contemporary environment with friendly and efficient service.

    35 years later, Chin Chin has firmly established itself as one of the most iconic restaurant brands in America, with 7 locations throughout Southern California and in New York-New York Hotel & Casino™ on the Las Vegas strip.

    Our longevity and success is because of our team of passionate professionals that are truly committed to delivering the best American Asian cuisine and a genuinely enjoyable dining experience.""", cuisine_type=1, user_id=1, cover_photo="https://resizer.otstatic.com/v2/photos/wide-huge/2/42115186.jpg", created_at = datetime.datetime.utcnow(), updated_at = datetime.datetime.utcnow())




    mr_chow = Restaurant(
        name = "Mr. Chow", location = "Beverly Hills", price_point = 4, phone_number = "(310) 278-9911", open_time = "5:30 PM", close_time = "11:30 PM", contact_email = "null", description = """Opened in 1974 by world famous restaurateur Michael Chow. MR CHOW started in London in 1968 and continues to enjoy generations of devoted clients from art, fashion, music, and entertainment. Art, celebrity and superb cuisine all blend together in this stylish restaurant in the heart of Beverly Hills, it has always been an institution for Hollywood’s biggest stars and its loyal clients.
    The American Academy of Hospitality Sciences recently awarded MR CHOW the 5 Star Diamond Award for excellence, service, and cuisine. Our Executive Chefs are one of most respected chefs in Chinese cuisine. MR CHOW is a combination of old authentic Beijing and Original Recipes. Chicken Satay, MR CHOW Noodles and Ma Mignon all were created by our passionate and skillful chefs. Also on the Menu is one of the best prepared Beijing Duck in the world.
    “Mr. Chow defies all odds and remains an impossibly chic spot that still draws the rich, famous and well-heeled decades after." - Los Angeles Times""", cuisine_type = 1, user_id = 2, cover_photo = "https://resizer.otstatic.com/v2/photos/wide-huge/1/25923645.jpg",  created_at = datetime.datetime.utcnow(), updated_at = datetime.datetime.utcnow())

    fifty_kitchen = Restaurant(
        name = "Fifty One Kitchen", location = "Culver City", price_point = 3, phone_number = "(310) 559-5966", open_time = "12:00 PM", close_time = "8:00 PM", contact_email = "fiftyonekitchen@gmail.com", description = "At Fifty One Kitchen, the passion for traditional Chinese, made-from-scratch cooking juxtaposed with reputable Chinese culinary expertise is clearly evident in its innovative wok-style and hand-prepped dishes including carefully-crafted handmade sauces, live seafood, and dim sum favorites. Using fresh farm-to-table ingredients, no MSG, no artificial flavoring, and low sodium, Fifty One Kitchen allows you to indulge in purposeful, quintessential Chinese comfort food at the heart of Los Angeles.", cuisine_type = 1, user_id = 3, cover_photo = "https://resizer.otstatic.com/v2/photos/wide-huge/1/25313958.jpg", created_at = datetime.datetime.utcnow(), updated_at = datetime.datetime.utcnow())

    tatel_hills = Restaurant(
        name = "Tatel Beverly Hills", location = "Beverly Hills", price_point = 3, phone_number = "(424) 380-7902", open_time = "12:00 PM", close_time = "12:00 AM", contact_email = "null", description ="""Based in Madrid and Ibiza TATEL represent the quintessential Spanish traditional Mediterranean recipes with a contemporary twist.
    Fresh, organic and locally sourced ingredients with Mediterranean recipes and quality Spanish seafood tradition.
    An unforgettable experience where food, cocktails and live music blend into one.
    A high gastronomic concept with daily live music shows.""", cuisine_type = 2, user_id = 4, cover_photo = "https://resizer.otstatic.com/v2/photos/wide-huge/3/42788652.jpg", created_at = datetime.datetime.utcnow(), updated_at = datetime.datetime.utcnow())


    manchengo_manchengo = Restaurant(
        name = "Manchengo", location = "Santa Monica", price_point = 2, phone_number = "(310) 450-3900", open_time = "5:00 PM", close_time = "9:00 PM", contact_email = "null", description = """Manchego also offers walk-ins!

    Manchego is a Spanish Tapas restaurant in Santa Monica that focuses on delicious small plates and a cozy atmosphere. We recently relocated a few doors down, to a larger space with a romantic patio in the back.

    Manchego has always been one of the best kept secrets in Santa Monica, and now locals can enjoy our bigger, more accommodating space that offers outside dining on our beautiful patio. Always a great spot for romantic dates or meeting up with friends and family.

    We also added a specially curated Spanish wine list that offers mainly small-production, unique wines. Our Spanish wine distributor spends his time traveling the Spanish countryside, sourcing hard to find wines from small, mom-and-pop wineries. The wine list also includes a few South American selections and a great local, organic wine.

    Follow us on instagram at instagram.com/manchegorestaurant""", cuisine_type = 2, user_id = 5, cover_photo = "https://resizer.otstatic.com/v2/photos/legacy/1/24610451.jpg", created_at = datetime.datetime.utcnow(), updated_at = datetime.datetime.utcnow())


    coco_palm = Restaurant(
        name = "Coco Palm", location = "Pomona", price_point = 2, phone_number = "(909) 469-1965", open_time = "11:30 AM", close_time = "9:30 PM", contact_email = "null", description = """Havana meets Madrid at Coco Palm, the beautiful hilltop restaurant overlooking the San Gabriel Valley. Begin your evening with a Mojito or Sangria in the lounge, and then enjoy dinner while listening to our house music in the elegant restaurant, specializing in traditional Spanish and Cuban cuisine. Don't miss the Paella Valencia or the House Steak, a 55oz bone-in ribeye chop for sharing. A variety of fresh seafood is available daily - from lobster and shrimp to fresh salmon in Albarino wine sauce or loin of Sea Bass in a Mango-miso sauce.

    On Sunday& we offer a wonderful mix of brunch items from our a la carte brunch menu.

    Valet Parking is mandatory on Friday & Saturday Nights and generally during all major holidays. Valet is $6/vehicle. Also most of the month of December we have daily valet.""", cuisine_type = 2, user_id = 6, cover_photo = "https://resizer.otstatic.com/v2/photos/wide-huge/3/26375867.jpg", created_at = datetime.datetime.utcnow(), updated_at = datetime.datetime.utcnow())

    girl_and_the_goat = Restaurant(
        name = "Girl & the Goat L.A.", location = "Downtown" , price_point = 3, phone_number = "(213) 799-4628", open_time = "5:00 PM", close_time = "10:00 PM", contact_email = "info.la@girlandthegoat.com", description = """Coming soon!

    Chef Stephanie Izard and her team are thrilled to join LA’s vibrant restaurant community and continue our tradition of serving tasty, bold-flavored foods in a fun and lively family-style setting. A few favorites, like goat empanadas and sautéed green beans, will be back on the menu. Stephanie and her team have also crafted new dishes inspired by California produce and local flavors, like carrot-tahini dip with tahini tofu, and curried goat with radishes, pickled vegetables, and masa chips. To enhance the experience we offer a selection of wines from around the world with a focus on small producers, a rotating list of craft beers, and a list of fun cocktails created by our bartenders.

    Located in the Arts District at 555 Mateo, Girl & the Goat offers dinner service Monday through Sunday, plus brunch Sunday. Girl & the Goat accepts reservations but always welcomes walk-ins, nomads and adventurers!""", cuisine_type = 3, user_id = 8, cover_photo = "https://resizer.otstatic.com/v2/photos/wide-huge/2/42434778.jpg", created_at = datetime.datetime.utcnow(), updated_at = datetime.datetime.utcnow())

    engine_no_28 = Restaurant(
        name = "Engine Co. No. 28", location = "Downtown", price_point = 3, phone_number = "(213) 624-6996", open_time = "11:30 AM", close_time = "9:30 PM", contact_email = "contacts@engineco.com", description = """Housed in a beautifully restored 1912 firehouse, Engine Co. No. 28 located 3 blocks from the Staples Center and the Los Angeles Convention center has been putting out appetite fires since 1989 with classic American dishes inspired by the regional cooking of firehouses across the country.

    The menu features a "signature" Meatloaf, crispy hand-breaded fried chicken, a burger to remember and a great assortment of handmade cocktails, a consistently updated wine list, and a great draft beer selection.

    The restaurant is reminiscent of the classic grills of San Francisco and New York - mahogany booths, granite bar, and original brass fire pole with eclectic old filament light bulbs to add to the motif.""", cuisine_type = 3, user_id = 9, cover_photo = "https://resizer.otstatic.com/v2/photos/wide-huge/1/26073210.jpg", created_at = datetime.datetime.utcnow(), updated_at = datetime.datetime.utcnow())

    weho_the = Restaurant(
        name = "WeHo Bistro", location = "West Hollywood", price_point = 2, phone_number = "(310) 657-9696", open_time = "11:00 AM", close_time = "10:00 PM", contact_email = "meet@wehobistro.com", description = """French Casual Cuisine in the center of WeHo. Delicious food. Incredible wine selection & Cocktail Bar. A Comfortable place to spend time with friends and family. Attentive Service. And 84 free parking spots on 3 levels shared with CVS.""", cuisine_type = 4, user_id = 10, cover_photo = "https://resizer.otstatic.com/v2/photos/legacy/1/23674924.jpg", created_at = datetime.datetime.utcnow(), updated_at = datetime.datetime.utcnow())

    marco_polo= Restaurant(
        name = "Marco Polo at Silver Lake Pool & Inn", location = "Silver Lake", price_point = 2, phone_number = "(323) 486-7176", open_time = "11:00 AM", close_time = "3:00 PM", contact_email = "marcopolo@silverlakepi.com", description = """We believe in an afternoon spritz, pasta for lunch, a good espresso or two, and taking a refreshing dip between courses. An inviting al fresco dining experience with a low-key locals vibe. Everyone welcome!""", cuisine_type = 4, user_id = 11, cover_photo = "https://resizer.otstatic.com/v2/photos/wide-huge/4/27918547.jpg", created_at = datetime.datetime.utcnow(), updated_at = datetime.datetime.utcnow())

    mazal_mazal = Restaurant(
        name = "Mazal", location = "Echo Park", price_point = 2, phone_number = "(323) 576-2138", open_time = "5:00 PM", close_time = "9:00 PM", contact_email = "null", description = """A handcrafted and carefully selected collection of shareable small plates and appetizers, Mazal provides a new perspective on Israeli cuisine. Our open kitchen setting and transparent atmosphere allow you to briefly step into our home. Supported by a robust and exciting natural/organic wine menu and independent craft beer selection, the plant-based menu provides an array of fresh ingredients that will transport you to a night out on the Mediterranean.""", cuisine_type = 4, user_id = 12, cover_photo = "https://resizer.otstatic.com/v2/photos/wide-huge/1/32375279.jpg", created_at = datetime.datetime.utcnow(), updated_at = datetime.datetime.utcnow())



    sage_plant = Restaurant(
        name = "Sage Plant Based Bistro & Brewery- Pasadena", location = "Pasadena" , price_point = 2, phone_number = "(626) 564-8111", open_time = "9:00 AM", close_time = "10:00 PM", contact_email = "null", description = """We are organic, sustainable, plant-based food without the pretense. We are the place where you can bring your date at night and your momma in the morning.""", cuisine_type = 5, user_id = 13, cover_photo = "https://resizer.otstatic.com/v2/photos/wide-huge/3/26703898.jpg", created_at = datetime.datetime.utcnow(), updated_at = datetime.datetime.utcnow())


    stk = Restaurant(
        name = "STK - Los Angeles", location = "Westwood", price_point = 4, phone_number = "(310) 659-3535", open_time = "3:00 PM", close_time = "10:00 PM", contact_email = "null", description = """***** We are thrilled to offer STK Under the Stars at our poolside restaurant while we observe social distance dining at STK Los Angeles. All STK reservations prior to 3pm will be offered the Hideout menu.

    STK artfully blends two concepts into one—the modern steakhouse and a chic lounge. A large central lounge area is furnished with creamy leather banquettes and textured crocodile tiles, and is surrounded by an elevated dining room for more formal dining. Theatrical lights illuminate each table, while smoky mirrors allow patrons to catch a glimpse of the surroundings while a DJ creates an energetic vibe throughout the entire space. STK Los Angeles is located in the heart of Westwood at the W Hotel Los Angeles- West Beverly Hills. As anticipated, steak is the main attraction. STK offers small, medium and large cuts of meat, as well as naturally raised options and market fresh fish entrees.""", cuisine_type = 5, user_id = 14, cover_photo = "https://images.otstatic.com/prod1/29541910/1/medium.jpg", created_at = datetime.datetime.utcnow(), updated_at = datetime.datetime.utcnow())

    oasis_restaurant = Restaurant(name = "Oasis Bar & Restaurant", location = "Van Nuys" , price_point = 3, phone_number = "(818) 646-0444", open_time = "5:30 PM", close_time = "11:30 PM", contact_email = "reserve@oasisvannuys.com", description = """Our OUTDOOR ONLY restaurant is absolutely gorgeous. Experience the finest American Euro Fusion and hospitality from the Oasis Bar & Restaurant in Van Nuys.
    As one of the premier restaurants in Los Angeles, our menu is rich with a diverse selection of today's favorites and the all time classics.""", cuisine_type = 5, user_id = 14, cover_photo = """https://resizer.otstatic.com/v2/photos/wide-huge/1/32331448.jpg""", created_at = datetime.datetime.utcnow(), updated_at = datetime.datetime.utcnow())

    mama = Restaurant(
        name = "Mama Por Dios", location = "Beverly Hills" , price_point = 2, phone_number = "(424) 284-3052", open_time = "5:00 PM", close_time = "12:00 AM", contact_email = "null", description = """LIVE THE EXPERIENCE IN EVERY DISH!

    Mamá Por Dios is a restaurant that highlights the best of México, with its flavors, aromas, colors, traditions, and art. Bringing it closer to its customers and every drink in every corner.""", cuisine_type = 5, user_id = 15, cover_photo = """https://resizer.otstatic.com/v2/photos/wide-huge/3/42264511.jpg""", created_at = datetime.datetime.utcnow(), updated_at = datetime.datetime.utcnow())

    db.session.add(chin_chin)
    db.session.add(mr_chow)
    db.session.add(fifty_kitchen)
    db.session.add(tatel_hills)
    db.session.add(manchengo_manchengo)
    db.session.add(coco_palm)
    db.session.add(girl_and_the_goat)
    db.session.add(engine_no_28)
    db.session.add(weho_the)
    db.session.add(marco_polo)
    db.session.add(mazal_mazal)
    db.session.add(sage_plant)
    db.session.add(stk)
    db.session.add(oasis_restaurant)
    db.session.add(mama)
    db.session.commit()
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
