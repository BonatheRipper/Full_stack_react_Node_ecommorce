import bcrypt from "bcryptjs";

const Data = {
  users: [
    {
      name: "Bona Andrews",
      email: "Bona9ja@gmail.com",
      password: bcrypt.hashSync("123456"),
      isAdmin: true,
    },
    {
      name: "Joel Ani",
      email: "joel@gmail.com",
      password: bcrypt.hashSync("123456"),
      isAdmin: false,
    },
  ],

  products: [
    {
      name: " Nike Slim Shirt 0",
      slug: " nike-slim-shirt4",
      category: "shirts",
      image:
        "https://burst.shopifycdn.com/photos/fashionable-man-in-hat.jpg?width=746&format=pjpg&exif=1&iptc=1",
      price: 120,
      countInStock: 10,
      brand: "Nike",
      rating: 4.5,
      numReviews: 10,
      description: "High quality shirt",
    },
    {
      name: "Puma shirt",
      slug: "Puma-slim-shirt3",
      category: "shirts",
      image:
        "https://burst.shopifycdn.com/photos/man-in-white-and-light-tan-outfit.jpg?width=746&format=pjpg&exif=1&iptc=1",
      price: 20,
      countInStock: 10,
      brand: "Nike",
      rating: 4.5,
      numReviews: 10,
      description: "High quality shirt",
    },
    {
      name: "Open Ankara Shirt",
      slug: " nike-slim-shirt2",
      category: "shirts",
      image:
        "https://burst.shopifycdn.com/photos/slow-fashion-coat.jpg?width=746&format=pjpg&exif=1&iptc=1",
      price: 100,
      countInStock: 101,
      brand: "ankara",
      rating: 4.5,
      numReviews: 4,
      description: "High quality shirt",
    },
    {
      name: " Nike  Shirt",
      slug: " new-slim-shirt1",
      category: "shirts",
      image:
        "https://burst.shopifycdn.com/photos/mens-fashion-loose-cotton-shirt.jpg?width=746&format=pjpg&exif=1&iptc=1",
      price: 50,
      countInStock: 5,
      brand: "Nike",
      rating: 3.0,
      numReviews: 9,
      description: "High quality shirt",
    },
    {
      name: " Nike Slim Shirt 2",
      slug: " nike-slim-shirt5",
      category: "shirts",
      image:
        "https://burst.shopifycdn.com/photos/man-buttoning-a-dark-red-shirt.jpg?width=746&format=pjpg&exif=1&iptc=1",
      price: 120,
      countInStock: 10,
      brand: "Nike",
      rating: 2.5,
      numReviews: 6,
      description: "High quality shirt",
    },
    {
      name: " Nike Slim Shirt 3",
      slug: " nike-slim-shirt6",
      category: "shirts",
      image:
        "https://burst.shopifycdn.com/photos/urban-mens-fashion-on-young-adult.jpg?width=746&format=pjpg&exif=1&iptc=1",
      price: 120,
      countInStock: 10,
      brand: "Nike",
      numReviews: 5,
      rating: 4.5,

      description: "High quality shirt",
    },
    {
      name: " Nike Slim Shirt 4",
      slug: " nike-slim-shirt8",
      category: "shirts",
      image:
        "https://burst.shopifycdn.com/photos/man-poses-in-light-colored-overcoat.jpg?width=746&format=pjpg&exif=1&iptc=1",
      price: 120,
      countInStock: 10,
      numReviews: 5,
      description: "High quality shirt",

      brand: "Nike",
      rating: 4.5,
    },
    {
      name: " Nike Slim Shirt 5",
      slug: " nike-slim-shirt03",
      category: "shirts",
      image:
        "https://burst.shopifycdn.com/photos/man-hiking-in-mountains.jpg?width=746&format=pjpg&exif=1&iptc=1",
      price: 120,
      countInStock: 10,
      numReviews: 5,
      description: "High quality shirt",

      brand: "Nike",
      rating: 4.5,
    },
    {
      name: " Nike Slim Shirt 6",
      slug: " nike-slim-shirt32",
      category: "shirts",
      image:
        "https://burst.shopifycdn.com/photos/green-blazer-shoes-step-in-style.jpg?width=746&format=pjpg&exif=1&iptc=1",
      price: 120,
      countInStock: 10,
      numReviews: 5,
      description: "High quality shirt",

      brand: "Nike",
      rating: 4.5,
    },
    {
      name: " Nike Slim Shirt 7",
      slug: " nike-slim-shirt22",
      category: "shirts",
      image:
        "https://burst.shopifycdn.com/photos/mens-fashion-stonewash-jeans-and-boots.jpg?width=746&format=pjpg&exif=1&iptc=1",
      price: 120,
      countInStock: 10,
      brand: "Nike",
      rating: 3.5,
      numReviews: 1,
      description: "High quality shirt",
    },
    {
      name: " Nike Slim Shirt 8",
      slug: " nike-slim-shirt22",
      category: "shirts",
      image:
        "https://burst.shopifycdn.com/photos/light-men-s-dress-shirt.jpg?width=746&format=pjpg&exif=1&iptc=1",
      price: 120,
      countInStock: 10,
      brand: "Nike",
      rating: 4.0,
      numReviews: 20,
      description: "High quality shirt",
    },
  ],
};

export default Data;
