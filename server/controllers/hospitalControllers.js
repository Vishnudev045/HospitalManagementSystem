import User from '../models/userModel.js';
import Hospital from "../models/hospitalModel.js";
import cloudinary from 'cloudinary'


export const createHospital = async (req, res) => {
    const { name, city, image, speciality
        , rating } = req.body;
    const { authorId} = req.body;

    try {

        const author = await User.findById(authorId);

        if(!author){
            return res.status(404).json({ message: 'Author not found' });
        }

        if (!name || !city || !image || !speciality
            || !rating) {
            return res.status(400).json({ message: "All fields are required" });
        }

        let uploadedImageUrl;
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image, {
                folder: "hospitals", // optional: you can specify a folder in your cloudinary account
            });
            uploadedImageUrl = uploadResponse.secure_url;
            console.log(uploadedImageUrl);
        }

        const newHospital = new Hospital({
            name,
            city: city.toLowerCase(),
            image : uploadedImageUrl,
            speciality,
            rating,
            author: author._id,
        })

        await newHospital.save();
        res.status(201).json(newHospital);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
        console.log(error);
    }
}

export const getHospitals = async (req, res) => {
    const city = req.query.city.toLowerCase() ? req.query.city.toLowerCase() : 'delhi';

    try {
        if (!city) {
            return res.status(400).json({ message: "City is required" });
        }

        const hospitals = await Hospital.find({ city: city });

        if (!hospitals) {
            return res.status(404).json({ message: "No hospitals found in this city" });
        }

        res.status(200).json(hospitals)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
}

export const updateHospital = async (req, res) => {

    const { name, city, image, speciality, rating } = req.body;
    const id = req.params.id;

    try {
        if (!id) {
            return res.status(400).json({ message: "ID is required" });
        }

        if (!name || !city || !image || !speciality || !rating) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const hospital = await Hospital.findByIdAndUpdate(id, {
            name,
            city: city.toLowerCase(),
            image,
            speciality,
            rating
        }, { new: true });

        res.status(200).json("Post is Updated");


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
}

export const updateHospital2 = async (req, res) => {
    const id = req.params.id;

    try {
        const hospital = await Hospital.findById(id);

        if(!hospital) {
            return res.status(404).json({ message: 'Hospital not found' });
        }

        res.status(200).json(hospital);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
}
 
export const getHospitalProfile = async (req, res) => {
    const id = req.params.id;

    try {
        const hospital = await Hospital.findById(id);

        if(!id){
            return res.status(404).json({ message: 'Hospital not found' });
        }

        res.status(200).json(hospital);

    } catch (error) {
        
    }
}

export const getAllHospitals = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const hospitals = await Hospital.find({ author: user._id });

        if (!hospitals || hospitals.length === 0) {
            return res.status(404).json({ message: 'No hospitals found' });
        }

        res.status(200).json(hospitals);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

export const createDetails = async (req, res) => {
    const { description, numberOfDoctors, numberOfDepartments } = req.body;
    const id = req.query.id;

    try {
        if (!id) {
            return res.status(400).json({ message: "ID is required" });
        }

        console.log(id)

        // Assuming images are URLs or paths stored in the request body
        const hospitalDetails = await Hospital.findByIdAndUpdate(
            id,
            {
                description,
                images: req.body.images || [], // Ensure images are handled properly
                numberOfDoctors,
                numberOfDepartments
            },
        );

        if (!hospitalDetails) {
            return res.status(404).json({ message: "Hospital not found" });
        }

        res.status(200).json(hospitalDetails);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: "Server Error" });
    }
}

export const deleteHospitals = async (req, res) => {
    const id = req.params.id;

    try {
        if (!id) {
            return res.status(400).json({ message: "ID is required" });
        }

        await Hospital.findByIdAndDelete(id);

        res.status(200).json({ message: "Hospital is deleted" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
}