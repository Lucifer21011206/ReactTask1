import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import Layout from "./layout"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <Layout>
      <App />
    </Layout>
  </React.StrictMode>,
)

