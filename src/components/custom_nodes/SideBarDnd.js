
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  node: {
    textAlign:'center', 
    width: 42, 
    height: 'height',
    borderColor: '#ff0072', 
    border: '2px solid', 
    borderRadius: '2px', 
    cursor: 'grab',
    padding: 2,
    margin:5
  },
  description:{
    display: 'flex',
    flexGrow: 1,
    flexDirection:'row',
  }



}));

export default function Sidebar(){
  const classes = useStyles();
  const inputNode = (text) => {
      return(
          <div className={classes.node} onDragStart={(event) => onDragStart(event, 'electricNode', text, '520003')} draggable>
              <h3 style={{ alignSelf:'center' }}>{text}</h3>
          </div>
      )
  }
    
  const onDragStart = (event, nodeType, text, name) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.setData('label', text)
    event.dataTransfer.setData('name', name)
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside style={{height:'100%', width:'100%'}}>
      <div >Clique e arraste um componente para adiciona-lo ao diagrama.</div>
      <div className={classes.description}>
        {inputNode("RL")}
        {inputNode("CH")}
        {inputNode("XS")}
      </div>
      
    </aside>
  );
};