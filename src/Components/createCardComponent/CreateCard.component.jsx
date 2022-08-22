const CreatecardComponent = ({
  bizName,
  bizDescription,
  bizImage,
  bizAddress,
  bizPhone,
  _id,
  onDelete,
  onEdit,
}) => {
  const hendeleEditBtnClick = () => {
    onEdit(_id);
  };
  const hendelDeleteBtnClick = () => {
    onDelete(_id);
  };
  return (
    <div>
      <div className="card">
        <img src={bizImage} className="card-img-top" alt="Card image cap" />
        <div className="card-body">
          <h5 className="card-title">{bizName}</h5>
          <p className="card-text">{bizDescription}</p>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">{bizAddress}</li>
            <li className="list-group-item">{bizPhone}</li>
          </ul>
          <div className="d-flex p-2 justify-content-around">
            <button
              href="#"
              className="btn btn-warning"
              onClick={hendeleEditBtnClick}
            >
              Edit
            </button>
            <button
              href="#"
              className="btn btn-danger"
              onClick={hendelDeleteBtnClick}
              // _id
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreatecardComponent;
