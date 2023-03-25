const express = require("express") //including express package
const router = express.Router() //creates instance router
const contact = require("../schemas/data")
const users = require("../schemas/user")

//Attach the handler


router.get("/:search", async (req, res) => {
    let search = `^${req.params.search}`
    try {
        const searchedUser = await contact.find({
            userID: req.params.userID,
            
            $or: [{ email: { $regex: search, $options: "i" } },] //i for case senstivity match
           
        })
            .populate(     //provides a reference to document from any other collection
                "userID",
            )
        return res.status(200).json({
            contacts: searchedUser
        })
    } catch (e) {
        console.log(e);
        
    }
})

module.exports = router



