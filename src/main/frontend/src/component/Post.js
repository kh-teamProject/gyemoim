import Postcode from "@actbase/react-daum-postcode";

const Post = (props) => {

  return (
    <>
      <Postcode
        style={{width: 400, height: 400, position: 'fixed', top: '50%', left: '50%', transform: 'translate(-200px, -200px)'}}
        onSelected={data => {
          props.onSaveAddress({
            postcode: data.zonecode,
            address: data.address,
            isPost: false
          });
        }}
      />
    </>
  );
};

export default Post;