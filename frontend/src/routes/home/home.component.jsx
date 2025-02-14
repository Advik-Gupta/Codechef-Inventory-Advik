import { Row, Col } from "react-bootstrap";

import ProductCard from "../../components/product-card/product-card.component";
import Loader from "../../components/loader/loader.component";
import Message from "../../components/message/message.component";

import { useGetProductsQuery } from "../../slices/productsSlice";

const Home = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <h1>Inventory products</h1>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default Home;
