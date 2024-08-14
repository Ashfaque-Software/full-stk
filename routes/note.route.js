import express from "express";
import noteModel from "../model/note.model.js"; // Ensure correct import path

const noteRouter = express.Router();

noteRouter.post("/create", async (req, res) => {
   console.log(req.body,req.user)
   const {title,content,status}=req.body
   const userId=req.user._id
   try {
    const note=new noteModel({
        title,content,status,userId
    })
    await note.save()
    res.status(201).json({message:"note created successfully"})
   } catch (error) {
    res.status(500).json({message:`error while createing notes ${error}`})
   }
});

noteRouter.get("/get", async (req, res) => {
   const userId=req.user._id
   try {
    const notes=await noteModel.find({userId});
    res.status(201).json({notes})
   } catch (error) {
    res.status(500).json({message:`error while fetching notes ${error}`})
   }
});

noteRouter.patch("/update/:id", async (req, res) => {
   const payload=req.body
   const noteId=req.params.id
   const userId=req.user._id
   try {
    const note=await noteModel.findOne({_id:noteId})
    if(note.userId.toString()===userId.toString()){
        await noteModel.findByIdAndUpdate({_id:noteId},payload)
        return res.status(200).json({message:"note updated successfully"})
    }else{
        return res.status(401).json({message:"unauthorized"})
    }
   } catch (error) {
    res.status(500).json({message:`error while updating note ${error}`})
   }
});

noteRouter.delete("/delete/:id", async (req, res) => {
    const noteId = req.params.id;
    const userId = req.user._id;

    try {
        // Find the note by ID
        const note = await noteModel.findById(noteId);
        
        // Check if the note exists and if it belongs to the user
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }
        
        if (note.userId.toString() !== userId.toString()) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // Delete the note
        await noteModel.findByIdAndDelete(noteId);

        res.status(200).json({ message: "Note deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: `Error while deleting note: ${error}` });
    }
});

export default noteRouter;