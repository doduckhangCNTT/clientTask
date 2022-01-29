import Button from 'react-bootstrap/Button';
import { PostContext } from '../../contexts/PostContext';
import { useContext } from 'react';

const ActionButtons = ({ url, _id }) => {
  const { deletePost, findPost, setShowUpdatePostModal } =
    useContext(PostContext);

  const choosePost = (postId) => {
    findPost(postId);
    // bat cai hop thoai
    setShowUpdatePostModal(true);
  };

  return (
    <>
      <Button className='post-button' href={url} target='_blank'>
        Play
      </Button>
      <Button className='post-button' onClick={() => choosePost(_id)}>
        Edit
      </Button>
      <Button className='post-button' onClick={() => deletePost(_id)}>
        Delete
      </Button>
    </>
  );
};

export default ActionButtons;
