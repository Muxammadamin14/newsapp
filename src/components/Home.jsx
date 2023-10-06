import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col, Row, Button, Form, Spinner } from "react-bootstrap";

const Home = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // PAGINATION
  const limit = 5;
  const numOfPages = Math.ceil(allPosts.length / limit);
  const arrBtns = Array.from({ length: numOfPages }, (_, i) => i + 1);

  const fetchPosts = async (page) => {
    try {
      const res = await axios.get(`http://localhost:3000/news?_page=${page}&_limit=${limit}`);
      setPosts(res.data);
      setErrorMessage("");
    } catch (err) {
      console.log(err);
      setErrorMessage("Failed to retrieve posts. Please try again later.");
    }
  };

  const filterPostsByCategory = (category) => {
    setCategory(category);
    setPage(1);
  };

  const searchPosts = (searchTerm) => {
    setSearchTerm(searchTerm);
    setPage(1);
  };

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const res = await axios.get("http://localhost:3000/news");
        setAllPosts(res.data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setErrorMessage("Failed to retrieve posts. Please try again later.");
      }
    };

    fetchAllPosts();
  }, []);

  useEffect(() => {
    fetchPosts(page);
  }, [page, category, searchTerm]);

  return (
    <div>
      <h1>News</h1>
      <div>
        <Form.Group>
          <Form.Label>Filter by Category:</Form.Label>
          <Form.Control as="select" value={category} onChange={(e) => filterPostsByCategory(e.target.value)}>
            <option value="">All</option>
            <option value="sports">Sports</option>
            <option value="politics">Politics</option>
            <option value="entertainment">Entertainment</option>
          </Form.Control>
        </Form.Group>
      </div>
      <div>
        <Form.Group>
          <Form.Label>Search by ID or Title:</Form.Label>
          <Form.Control type="text" value={searchTerm} onChange={(e) => searchPosts(e.target.value)} />
        </Form.Group>
      </div>
      {isLoading ? (
        <Spinner animation="border" variant="primary" />
      ) : (
        <Row>
          {posts.length === 0 ? (
            <p>No posts found.</p>
          ) : (
            posts
              .filter((post) => category === "" || post.category === category)
              .filter(
                (post) =>
                  searchTerm === "" ||
                  post.id.toString().includes(searchTerm) ||
                  post.title.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .slice(0, limit)
              .map((post) => (
                <Col key={post.id} md={4} className="mb-4">
                  <Card>
                    <Card.Body>
                      <Card.Title>{post.title}</Card.Title>
                      <Card.Text>{post.body}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))
          )}
        </Row>
      )}
      {errorMessage && <p>{errorMessage}</p>}
      <div>
        {arrBtns.map((item) => (
          <Button key={item} className="py-2" onClick={() => setPage(item)}>
            {item}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Home;
