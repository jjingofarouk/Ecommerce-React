// src/pages/Product.js
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link, useParams } from "react-router-dom";
import Marquee from "react-fast-marquee";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import { Footer, Navbar } from "../components";
import { db } from "../firebase";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      setLoading2(true);
      try {
        const productDoc = await getDoc(doc(db, "products", id));
        if (productDoc.exists()) {
          setProduct({ id: productDoc.id, ...productDoc.data() });
        } else {
          console.error("Product not found");
        }
        setLoading(false);

        const querySnapshot = await getDocs(collection(db, "products"));
        const products = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const related = products.filter(
          (p) =>
            p.category.some((cat) => productDoc.data().category.includes(cat)) &&
            p.id !== id
        );
        setSimilarProducts(related);
        setLoading2(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
        setLoading2(false);
      }
    };
    getProduct();
  }, [id]);

  const Loading = () => (
    <div className="container my-5 py-2">
      <div className="row">
        <div className="col-md-6 py-3">
          <Skeleton height={400} width={400} />
        </div>
        <div className="col-md-6 py-5">
          <Skeleton height={30} width={250} />
          <Skeleton height={90} />
          <Skeleton height={40} width={70} />
          <Skeleton height={50} width={110} />
          <Skeleton height={120} />
          <Skeleton height={40} width={110} inline={true} />
          <Skeleton className="mx-3" height={40} width={110} />
        </div>
      </div>
    </div>
  );

  const ShowProduct = () => (
    <div className="container my-5 py-2">
      <div className="row">
        <div className="col-md-6 col-sm-12 py-3">
          <img
            className="img-fluid"
            src={product.imageUrl}
            alt={product.name}
            style={{
              objectFit: "contain",
              maxHeight: "400px",
              width: "100%",
            }}
          />
        </div>
        <div className="col-md-6 col-md-6 py-5">
          <h4 className="text-uppercase text-muted">
            {product.category.join(", ")}
          </h4>
          <h1 className="display-5">{product.name}</h1>
          <p className="lead">
            {product.averageRating} <i className="fa fa-star"></i> ({product.reviewsCount} reviews)
          </p>
          <h3 className="display-6 my-4">
            {product.price.toLocaleString()} {product.currency}
          </h3>
          <p className="lead">{product.description}</p>
          <p className="text-muted">
            Stock: {product.stockStatus === "in-stock" ? "In Stock" : "Low Stock"}
          </p>
          <p className="text-muted">
            Sizes: {product.specifications.sizes.join(", ")}
          </p>
          <p className="text-muted">
            Colors: {product.specifications.colors.join(", ")}
          </p>
          <button
            className="btn btn-outline-dark"
            onClick={() => addProduct(product)}
            disabled={product.stockStatus === "out-of-stock"}
          >
            Add to Cart
          </button>
          <Link to="/cart" className="btn btn-dark mx-3">
            Go to Cart
          </Link>
        </div>
      </div>
    </div>
  );

  const Loading2 = () => (
    <div className="my-4 py-4">
      <div className="d-flex">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="mx-4">
            <Skeleton height={400} width={250} />
          </div>
        ))}
      </div>
    </div>
  );

  const ShowSimilarProduct = () => (
    <div className="py-4 my-4">
      <div className="d-flex">
        {similarProducts.map((item) => (
          <div key={item.id} className="card mx-4 text-center">
            <img
              className="card-img-top p-3"
              src={item.imageUrl}
              alt={item.name}
              style={{
                objectFit: "contain",
                maxHeight: "300px",
                width: "100%",
              }}
            />
            <div className="card-body">
              <h5 className="card-title">{item.name.substring(0, 15)}...</h5>
              <p className="text-muted small">
                {item.stockStatus === "in-stock" ? "In Stock" : "Low Stock"}
              </p>
            </div>
            <div className="card-body">
              <Link to={`/product/${item.id}`} className="btn btn-dark m-1">
                Buy Now
              </Link>
              <button
                className="btn btn-dark m-1"
                onClick={() => addProduct(item)}
                disabled={item.stockStatus === "out-of-stock"}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <div className="container">
        <div className="row">
          {loading || !product ? <Loading /> : <ShowProduct />}
        </div>
        <div className="row my-5 py-5">
          <div className="d-none d-md-block">
            <h2>You may also Like</h2>
            <Marquee pauseOnHover={true} pauseOnClick={true} speed={50}>
              {loading2 ? <Loading2 /> : <ShowSimilarProduct />}
            </Marquee>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;