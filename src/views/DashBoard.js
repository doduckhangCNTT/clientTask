import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { PostContext } from '../contexts/PostContext';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/esm/Button';
import Spinner from 'react-bootstrap/esm/Spinner';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import SinglePost from '../components/posts/SinglePost';
import AddPostModal from '../components/posts/AddPostModal';
import UpdatePostModal from '../components/posts/UpdatePostModal';
const DashBoard = () => {
  // Context
  const {
    authState: {
      user: { username },
    },
  } = useContext(AuthContext);

  const {
    postState: { post, posts, postsLoading },
    getPosts,
    setShowAddPostModal,
  } = useContext(PostContext);

  useEffect(() => {
    getPosts();
  }, []);
  let body = null;
  if (postsLoading) {
    // loading
    body = (
      <div className='spinner-container'>
        <Spinner animation='border' variant='info' />
      </div>
    );
  } else if (posts.length === 0) {
    body = (
      <>
        <Card className='text-center mx-5 my-5'>
          <Card.Header as='h1'>Hi {username}</Card.Header>
          <Card.Body>
            <Card.Title>Welcome to LearnIt</Card.Title>
            <Card.Text>
              Click the button below to track your first skill to learn
            </Card.Text>
            <Button
              variant='primary'
              onClick={setShowAddPostModal.bind(this, true)}
            >
              LearnIt!
            </Button>
          </Card.Body>
        </Card>
      </>
    );
  } else {
    body = (
      <>
        <Row className='row-cols-1 row-cols-md-3 g-4 mx-auto mt-3'>
          {posts.map((post) => (
            <Col key={post._id} className='my-2'>
              <SinglePost post={post} />
            </Col>
          ))}
        </Row>
      </>
    );
  }

  return (
    <>
      {body} <AddPostModal />
      {post !== null && <UpdatePostModal />}
      <Button
        className='btn-floating'
        onClick={() => setShowAddPostModal(true)}
      >
        ADD
      </Button>
    </>
  );
};

export default DashBoard;
