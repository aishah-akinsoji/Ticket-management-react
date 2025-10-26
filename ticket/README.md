# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
tickets.map(ticket => (
                    <div key={ticket.id} className="col-sm-12 col-md-4 card shadow-lg rounded-4 p-3 d-flex flex-column gap-2">
                    <div className="d-flex justify-content-between align-items-center">
                        <h5>{ticket.title}</h5>
                        <span className={`status px-2 py-1 rounded-2 text-white 
                        ${ticket.status === "Open" ? "bg-green" : ticket.status === "In Progress" ? "bg-orange" : "bg-grey"}`}>
                        {ticket.status}
                        </span>
                    </div>
                    <p>{ticket.description}</p>
                    <div className="d-flex gap-2 mt-auto">
                        <button className="btn btn-sm btn-primary" onClick={() => handleEditClick(ticket)}>Edit</button>
                        <button className="btn btn-sm btn-danger" onClick={() => handleDelete(ticket.id)}>Delete</button>
                    </div>
                    </div>
                ))
