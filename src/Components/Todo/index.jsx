import { Fragment, useState } from "react";
import { useAuth } from "../Auth";
import "./Todo.css";
import { Button, Modal, TagPicker,Input, SelectPicker } from "rsuite";
export const Todo = () => {
  const { dataTemp, data , setData ,filter,setFilter} = useAuth();
  const [open,setOpen]=useState(false);
  const [todoItem, setTodoItem] = useState({
    id:"",
    title: "",
    status:"",
    desc: "",
  });
  function handleDelete(id) {
    let temp = data.filter((ele,index) => {
      if (index !== id) {
        return ele;
      }
    });
    setData(temp);
  }

  function handleStatus(id) {
    let temp = data.map((ele,index) => {
      if (index === id) {
        return { ...ele, status: "Completed" };
      } else {
        return ele;
      }
    });
    setData(temp);
  }
  function handleEdit(id,title,desc,status) {
    setOpen(true);
    setTodoItem({id:id,title:title,desc:desc,status:status});
  }

  function handleEditSubmit(){
    let temp = data.map((ele,index) => {
      if (index === todoItem.id) {
        return { ...ele, status: todoItem.status,title: todoItem.title , desc: todoItem.desc };
      } else {
        return ele;
      }
    });
    setData(temp);
    setOpen(false);
  }

  return (
    <div className="Todo">
        <Modal open={open} backdrop={true} onClose={() => setOpen(false)}>
        <Modal.Header>Edit ToDo Item</Modal.Header>
        <Modal.Body>
          <label>Title</label>
          <Input
            className="Input"
            placeholder="Title"
            value={todoItem.title}
            onChange={(e) => setTodoItem({ ...todoItem, title: e })}
          />
          <label>Description</label>
          <Input
            placeholder="Description"
            className="Input"
            value={todoItem.desc}
            onChange={(e) => setTodoItem({ ...todoItem, desc: e })}
          />
          <label>Status</label>
          <SelectPicker
            style={{ width: "100%" }}
            data={["Inprogress","Completed"].map((item)=>({"label":item,"value":item}))}
            value={todoItem.status}
            onChange={(e) => setTodoItem({ ...todoItem, status: e })}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
           onClick={handleEditSubmit}
            style={{
              backgroundColor: "green",
              color: "white"
            }}
            disabled={todoItem.title === "" || todoItem.desc === ""}
          >
            Submit
          </Button>
          <Button
            onClick={() => {
              setOpen(false);
            }}
            style={{
              backgroundColor: "red",
              color: "white"
            }}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      {data.map((ele, index) => {
        if(filter===ele.status||filter==="All")
        return (
         <div className="main_div" key={index}>
            <div className="Todo__element">
              <b  style={{color:ele.status==="Completed"?"green":"blue"}}>Task No: {index + 1}</b>
              <span>Title: {ele.title}</span>
              <span>Description: {ele.desc}</span>
              <span>Status :<b style={{color:ele.status==="Completed"?"green":"blue"}}> {ele.status}</b></span>
           
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
              {ele.status==="Inprogress"&&<Button
                size="sm"
                className="CompleteBTN"
                onClick={() => handleStatus(index)}
              >
                Mark As Done
              </Button>}
              <Button
                size="sm"
                className="EditBTN"
                onClick={() => handleEdit(index,ele.title,ele.desc,ele.status)}
              >
                 Edit 
              </Button>
              <Button
                size="sm"
                className="DeleteBTN"
                onClick={() => handleDelete(index)}
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
