import mongoose from "mongoose";

// hospital Model
const hospitalSchema = new mongoose.Schema(
    {
        name :{
            type: String,
            required: true,
            unique: true
        },
        city: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        speciality: {
            type: [ String ],
            required: true
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },
        description: {
            type: String,
            required: false
        },
        images: {
            type: [ String ],
            required: false
        },
        numberOfDoctors : {
            type: Number,
            required: false
        },
        numberOfDepartments : {
            type: Number,
            required: false
        },
        author: { 
            type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true 
        },
    }
,{timestamps: true});

const Hospital = mongoose.model("Hospital", hospitalSchema);

export default Hospital;