'use client'

import Center from "@/components/Center";
import Header from "@/components/Header";
import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "@/app/firebaseConfig";
import ProductsGrid from "@/components/ProductsGrid";
import Title from "@/components/Title";

async function getDataFromFireStore() {
    try {
      const snapShot = await getDocs(collection(db, "products"));
      const data = [];
      snapShot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  useEffect(()=>{
    async function fetchData() {
      const data = await getDataFromFireStore();
      setProducts(data);
    }
    fetchData()
  },[])

  return (
    <>
    <Header />
    <Center>
        <Title>All products</Title>
        <ProductsGrid products={products} />
    </Center>
    </>
  )
}
