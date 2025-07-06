// Create a simple test file to verify the route is working
import express from "express"
import circleRouter from "./routes/circle-routes.js"

const app = express()
app.use(express.json())

// Test the specific route
app.use("/api/circles", circleRouter)

// Test endpoint
app.get("/test/:id/members", (req, res) => {
  console.log("Test route hit with ID:", req.params.id)
  res.json({ message: "Test route working", id: req.params.id })
})

app.listen(3001, () => {
  console.log("Test server running on port 3001")
  console.log("Test URL: http://localhost:3001/test/123/members")
})
