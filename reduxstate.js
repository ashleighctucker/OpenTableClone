state = {
  session: {
    user: {
      id: 1,
      email: 'example@email.com',
      username: 'exampleUser',
      firstName: 'Jane',
      lastName: 'Doe',
    },
  },
  restuarants: {
    id: {
      name: "Chili's",
      location: '1234 Main Street, Santa Clara, CA 95051',
      price_point: 2,
      phone_number: '123-456-7899',
      open_time: '10:00 AM',
      close_time: '10:00 PM',
      contact_email: 'email@email.com',
      cover_photo: 'url for photo',
      cusine_type: 'Other',
      reviews: {
        id: {
          rating: 2,
          comment: "Chili's is the best",
          restuarantId: 1,
          userId: 1,
          updated_at: 'timestamp',
          created_at: 'timestamp',
        },
      },
      reservations: {
        id: {
          restuarantId: 1,
          time_slot: '8:00 PM 1/1/2022',
          party_size: 3,
          available_size: 4,
          userId: 1,
          booked: 'True',
          notes: "It's my birthday!",
        },
      },
    },
  },
  favorites: {
    id: {
      name: "Chili's",
      location: '1234 Main Street, Santa Clara, CA 95051',
      price_point: 2,
      phone_number: '123-456-7899',
      open_time: '10:00 AM',
      close_time: '10:00 PM',
      contact_email: 'email@email.com',
      cover_photo: 'url for photo',
      cusine_type: 'Other',
    },
  },
  my_reservations: {
    id: {
      restuarantId: 1,
      time_slot: '8:00 PM 1/1/2022',
      party_size: 3,
      available_size: 4,
      userId: 1,
      booked: 'True',
      notes: "It's my birthday!",
    },
  },
  search_results: {
    restuarants: {
      id: {
        name: "Chili's",
        location: '1234 Main Street, Santa Clara, CA 95051',
        price_point: 2,
        phone_number: '123-456-7899',
        open_time: '10:00 AM',
        close_time: '10:00 PM',
        contact_email: 'email@email.com',
        cover_photo: 'url for photo',
        cusine_type: 'Other',
        reviews: {
          id: {
            rating: 2,
            comment: "Chili's is the best",
            restuarantId: 1,
            userId: 1,
            updated_at: 'timestamp',
            created_at: 'timestamp',
          },
        },
        reservations: {
          id: {
            restuarantId: 1,
            time_slot: '8:00 PM 1/1/2022',
            party_size: 3,
            available_size: 4,
            userId: 1,
            booked: 'True',
            notes: "It's my birthday!",
          },
        },
      },
    },
  },
};
