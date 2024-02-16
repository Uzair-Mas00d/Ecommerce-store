"use client";

import Button from "@/components/Button";
import { CartContex } from "@/components/CartContext";
import Center from "@/components/Center";
import Header from "@/components/Header";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Table from "@/components/Table";
import Input from "@/components/Input";
import { db } from "@/app/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

export default function CartPage() {
  const { cartProducts, addProduct, setCartProducts, decreseQty } =
    useContext(CartContex);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [address, setAddress] = useState("");
  const [deliver, setDeliver] = useState("pending");
  const [products, setProducts] = useState([]);
  const [success, setSuccess] = useState(false);
  let currentDate = new Date();

  function moreOfThisProduct(id, name, price, photoUrl) {
    addProduct(id, name, price, photoUrl);
  }

  function lessOfThisProduct(id, name, price, photoUrl, quantity) {
    const cartItem = {
      id: id,
      name: name,
      price: price,
      photoUrl: photoUrl,
      quantity: quantity,
    };

    decreseQty(cartItem);
  }

  let total = 0;
  for (const product of cartProducts) {
    total += product.price * product.quantity;
  }

  useEffect(() => {
    setProducts([]);
    cartProducts.map((product) =>
      setProducts((prev) => [
        ...prev,
        {
          productId: product.id,
          productName: product.name,
          photoUrl:
            product.photoUrl.length > 1
              ? product.photoUrl[0]
              : product.photoUrl,
          productQuantity: product.quantity,
          productPrice: product.price,
        },
      ])
    );
  }, [cartProducts]);

  async function HandleSubmit(e) {
    e.preventDefault();
    if (
      name == "" ||
      email == "" ||
      phone == "" ||
      city == "" ||
      postalCode == "" ||
      address == ""
    ) {
      return;
    }
    let currentDateTime =
      currentDate.toDateString() + " " + currentDate.toLocaleTimeString();
    try {
      const res = await addDoc(collection(db, "orders"), {
        name: name,
        email: email,
        phone: phone,
        city: city,
        postalCode: postalCode,
        address: address,
        products: products,
        totalPrice: total,
        deliver: deliver,
        createdAt: currentDateTime,
      });

      setName("");
      setEmail("");
      setPhone("");
      setCity("");
      setPostalCode("");
      setAddress("");
      setProducts([]);
      setDeliver("pending");
      localStorage.clear();
      setSuccess(true);
      setCartProducts([]);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  if (success) {
    return (
      <>
        <Header />
        <Center>
          <ColumnsWrapper>
            <Box>
              <h1>Thank you for your order!</h1>
              <p>confirmation will be send to email</p>
            </Box>
          </ColumnsWrapper>
        </Center>
      </>
    );
  }

  return (
    <>
      <Header />
      <Center>
        <ColumnsWrapper>
          <Box>
            {!cartProducts?.length && <div>Your cart is empty</div>}
            <h2>Cart</h2>
            {cartProducts?.length > 0 && (
              <Table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {cartProducts.map((product, i) => (
                    <tr key={i}>
                      <ProductInfoCell>
                        <ProductImageBox>
                          <img
                            src={
                              product.photoUrl?.length > 1
                                ? product.photoUrl[0]
                                : product.photoUrl
                            }
                          />
                        </ProductImageBox>
                        {product.name}
                      </ProductInfoCell>

                      <td>
                        <Button
                          onClick={() =>
                            lessOfThisProduct(
                              product.id,
                              product.name,
                              product.price,
                              product.photoUrl,
                              product.quantity
                            )
                          }
                        >
                          -
                        </Button>
                        <QuantityLabel>{product.quantity}</QuantityLabel>
                        <Button
                          onClick={() =>
                            moreOfThisProduct(
                              product.id,
                              product.name,
                              product.price,
                              product.photoUrl
                            )
                          }
                        >
                          +
                        </Button>
                      </td>
                      <td>Rs.{product.price * product.quantity}</td>
                    </tr>
                  ))}
                  <tr>
                    <td></td>
                    <td></td>
                    <td>Rs.{total}</td>
                  </tr>
                </tbody>
              </Table>
            )}
          </Box>

          {!!cartProducts?.length && (
            <Box>
              <h2>Order information</h2>
              <form onSubmit={HandleSubmit}>
                <Input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Input
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  type="number"
                  placeholder="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <CityHolder>
                  <Input
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                  <Input
                    type="text"
                    placeholder="Postal Code"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                  />
                </CityHolder>
                <Input
                  type="text"
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <Button block={1} type="primary">
                  Confirm Order
                </Button>
              </form>
            </Box>
          )}
        </ColumnsWrapper>
      </Center>
    </>
  );
}

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  margin-top: 40px;

  @media screen and (min-width: 768px) {
    grid-template-columns: 1.2fr 0.8fr;
  }
`;

const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
`;

const ProductInfoCell = styled.td`
  padding: 10px 0;
`;

const ProductImageBox = styled.div`
  width: 70px;
  height: 100px;
  padding: 2px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;

  img {
    max-width: 60px;
    max-height: 60px;
  }

  @media screen and (min-width: 768px) {
    padding: 10px;
    width: 100px;
  height: 100px;

    img {
      max-width: 80px;
      max-height: 80px;
    }
  }
`;

const QuantityLabel = styled.span`
  padding: 0 15px;
  display: block;

  @media screen and (min-width: 768px) {
    display: inline-block;
    padding: 0 10px;
  }
`;

const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;
