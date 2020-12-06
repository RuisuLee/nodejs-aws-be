# Backend part of Backery shop

### SQL scripts

#### Products table

```
insert into products (title, description, price, img) values
('Chocolate macaron', 'Intense deep chocolate flavor', 12, 'https://i.pinimg.com/564x/16/99/7d/16997de805e3850630be012d37677f7f.jpg'),
('Classic macaron', 'Classic light almond flavor', 10, 'https://i.pinimg.com/564x/dd/e4/65/dde46520ecb7b007b6851b1bcd2914e0.jpg'),
('Lavender macaron', 'Flavored, spicy, seductive', 15, 'https://i.pinimg.com/564x/ac/60/fc/ac60fc32ca11b5e42cdb74d45c01b726.jpg'),
('Lemon macaron', 'Bright rich taste with a slight sourness', 13, 'https://i.pinimg.com/564x/07/59/05/075905507cb7e4ab2082063b7eb14d68.jpg'),
('Mint macaron', 'Delightful with hints of freshness', 15, 'https://i.pinimg.com/564x/40/3c/30/403c30387e9cfdf598519d73098d79c1.jpg'),
('Orange macaron', 'A juicy orange in a new shape', 13, 'https://i.pinimg.com/564x/34/8d/7f/348d7f3dc13ff488f26bd72d5befd902.jpg'),
('Strawberry macaron', 'Classic delicate flavor of ripe strawberries', 12, 'https://i.pinimg.com/564x/bf/a0/de/bfa0de608f2342871d87ce7316d592f9.jpg')
```
#### Stocks table
```
insert into stocks (product_id, count) values
('8ad2190d-c533-41cb-8058-fa9ae2b3905b', 5),
('f7a5faee-600d-4464-89f7-bc79b560f052', 12),
('3129e763-c94e-4e88-9681-4161a3fed78c', 4),
('78f7dc92-405f-4dfc-8d72-647b96ddee7f', 9),
('f9e1b0a2-8074-48d4-bcf2-96e8eb38f510', 22),
('c1bb9805-4c33-4fd9-840e-94c154e2650e', 8),
('245ec26a-a4ae-41b6-831b-471f6d95fc32', 2)
```

Small change