import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPencil } from "@fortawesome/free-solid-svg-icons";

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
    <div className="container">
      <div className="card ">
        <img
          src={bizImage}
          className="card-img-top"
          alt={`photo of ${bizName}`}
        />
        <div className="card-body">
          <h5 className="card-title">Busines Name: {bizName}</h5>
          <p className="card-text">Description: {bizDescription}</p>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Address: {bizAddress}</li>
            <li className="list-group-item">Phone Number: {bizPhone}</li>
          </ul>

          <div className="d-grid gap-2">
            <button className="btn btn-warning" onClick={hendeleEditBtnClick}>
              <FontAwesomeIcon icon={faPencil} /> Edit
            </button>
            <button className="btn btn-danger" onClick={hendelDeleteBtnClick}>
              <FontAwesomeIcon icon={faTrash} /> Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreatecardComponent;
