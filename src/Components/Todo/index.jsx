import { useAuth } from "../Auth";
import "./Todo.css";
import { Button } from "rsuite";
export const Todo = () => {
  document.cookie = "name=bu";
  console.log(document.cookie);
  const { data, setData } = useAuth();
  function handleDelete(id) {
    let temp = data.filter((ele) => {
      if (ele.id !== id) {
        return ele;
      }
    });
    setData(temp);
  }

  function handleStatus(id) {
    let temp = data.map((ele) => {
      if (ele.id === id) {
        return { ...ele, status: "Completed" };
      } else {
        return ele;
      }
    });
    setData(temp);
  }

  return (
    <div className="Todo">
      {data.map((ele, index) => {
        return (
          <div className="main_div" key={index}>
            <div className="Todo__element">
              <span>Task No: {index + 1}</span>
              <span>{ele.title}</span>
              <span>Status : {ele.status}</span>
              <span>{ele.desc}</span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                bottom: "0px",
                alignSelf: "end",
                position: "absolute",
                width: "100%"
              }}
            >
              <Button
                size="sm"
                className="CompleteBTN"
                onClick={() => handleStatus(ele.id)}
              >
                Mark As Done
              </Button>
              <Button
                size="sm"
                className="DeleteBTN"
                onClick={() => handleDelete(ele.id)}
              >
                Delete
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
