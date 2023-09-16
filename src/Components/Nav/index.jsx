import "./Nav.css";
import { Button, Modal, Input, SelectPicker } from "rsuite";
import { useEffect, useState } from "react";
import { useAuth } from "../Auth";
export const NavBar = () => {
  const { data, setData ,setDataTemp,filter,setFilter} = useAuth();
  const [open, setOpen] = useState(false);
  const [todoItem, setTodoItem] = useState({
    title: "",
    desc: ""
  });
  
  useEffect(()=>{
    if(filter==="All"){
      setDataTemp(data);
    }
    else{
      let temp=data.filter((item)=>{
        if(item.status===filter){
          return item;
        }
      })
      setDataTemp(temp);
    }
  },[filter])
  const handleSubmit = () => {
    setData((prev) => [
      ...prev,
      { ...todoItem, id: prev.length + 1, status: "Inprogress" }
    ]);
    setOpen(false);
    setTodoItem({
      title: "",
      desc: ""
    });
  };
  return (
    <div className="nav">
      <Modal open={open} backdrop={true} onClose={() => setOpen(false)}>
        <Modal.Header>Add Your ToDo Item</Modal.Header>
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
            value={todoItem.desc}
            onChange={(e) => setTodoItem({ ...todoItem, desc: e })}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={handleSubmit}
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
      <span></span>
      <h5>Welcome To ToDo List ⏰</h5>
      <div>
        <SelectPicker
            style={{
              marginRight:"20px",
              width:"230px"
            }}
            data={["All","Inprogress","Completed"].map((item)=>({"label":item,"value":item}))}
            value={filter}
            onChange={(e)=>setFilter(e)}
            cleanable={false}
        />
        <Button
            size="sm"
            onClick={() => {
              setOpen(true);
            }}
            style={{
              backgroundColor: "green",
              color: "white",
              marginRight:"20px",
            }}
         >
        Add Item
      </Button>
      </div>
    </div>
  );
};
