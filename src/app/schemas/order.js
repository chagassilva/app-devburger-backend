import mongoose from "mongoose";
//import { number } from "yup";

//const { Schema } = mongoose;


const orderSchema = new mongoose.Schema({
  user: {   

    id: {
      type: String,
      required: true,
         },

   name: {
    type: String,
    required: true,
          },

        },

  product:[

    {

    id: {
      type: Number,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    category:{      
          type: String,
          required: true,
    },

    url: {
      type: String,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
    },

    },    

    ],

status: {

    type: String,
    required: true,
    // enum: ["pending", "completed"],
    // default: "pending",

        },


        timestamps: {

          type: Boolean,
          default: true,
      
                     }
               
 })

 export default mongoose.model("Order", orderSchema);