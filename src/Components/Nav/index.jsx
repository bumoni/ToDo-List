import "./Nav.css";
import { Button, Modal, Input } from "rsuite";
import { useState } from "react";
import { useAuth } from "../Auth";
export const NavBar = () => {
  const { data, setData } = useAuth();
  const [open, setOpen] = useState(false);
  const [todoItem, setTodoItem] = useState({
    title: "",
    desc: ""
  });

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
          <Input
            className="Input"
            placeholder="Title"
            value={todoItem.title}
            onChange={(e) => setTodoItem({ ...todoItem, title: e })}
          />
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
      <Button
        size="sm"
        onClick={() => {
          setOpen(true);
        }}
        style={{
          backgroundColor: "green",
          color: "white"
        }}
      >
        Add Item
      </Button>
    </div>
  );
};
