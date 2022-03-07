
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Handle, Position } from 'react-flow-renderer';



const useStyles = makeStyles((theme) => ({
    node: {
        textAlign:'center', 
        width: 42, 
        height: 42,
        borderColor: '#ff0072', 
        border: '2px solid', 
    },

  }));



export default function ElectricNode({ data }){
    const classes = useStyles()
    return (
        <div>
            <div className={classes.node}>
                <Handle type="target" position={Position.Left} />
                <Handle type="source" position={Position.Right}/>
                <h3 style={{ alignSelf:'center', margin:0}}>{data.label}</h3>
            </div>
            <div>
                <span style={{ alignSelf:'center', margin:0}}>{data.name}</span>
            </div>
        </div>
        
)};



