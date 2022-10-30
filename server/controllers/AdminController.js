function addAdmin(req,res){
    const newAdmin = new Admins(req.body);
    newAdmin.save().then(() => console.log("Admin added successfully")).catch((err) => console.log(err));
    res.send("new admin added successfully");
};

function addInstructor(req,res){
    const newInstructor = new Instructors(req.body);
    newInstructor.save().then(() => console.log("Instructor added successfully")).catch((err) => console.log(err));
    res.send("new instructor added successfully");
};

function addTrainee(req,res){
    const newCorporateTrainee = new Trainees(req.body);
    newCorporateTrainee.save().then(() => console.log("Trainee added successfully")).catch((err) => console.log(err));
    res.send("new corporate trainee added successfully");
};

module.exports = {addAdmin: addAdmin,addInstructor: addInstructor,addTrainee: addTrainee}

