'use client'

import Featured from "@/components/Featured";
import Header from "@/components/Header";
import { getDocs, collection } from "firebase/firestore";
import { db } from "@/app/firebaseConfig";
import { useEffect, useState } from "react";
import NewProduct from "@/components/NewProduct";

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

export default function Home() {
  const [featureProduct, setFeatureProduct] = useState({})
  const [newProducts, setNewProducts] = useState([]);

  useEffect(()=>{
    async function fetchData() {
      const data = await getDataFromFireStore();

      setFeatureProduct(data.find(({id})=> id =='mjv9jtgzLarNi82MhT2B'))
      data.length >= 10 ? data.splice(-10).reverse() : data.reverse()
      setNewProducts(data);
    }
    fetchData()
  },[])

  return (
    <div>
      <Header />
      <Featured featureProduct={featureProduct} />
      <NewProduct products={newProducts} />
    </div>
  );
}
