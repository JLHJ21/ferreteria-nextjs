"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const Sidebar = () => {
    const router = usePathname();

    const items = [
        {
            name: "Inicio",
            href: "/",
            active: router.split("/")[1] === "",
        },
        {
            name: "Ventas",
            href: "/sales",
            active: router.split("/")[1] === "sales",
        },
        {
            name: "Clientes",
            href: "/clients",
            active: router.split("/")[1] === "clients",
        },
        {
            name: "Gastos",
            href: "/bills",
            active: router.split("/")[1] === "bills",
        },
        {
            name: "Prestamos",
            href: "/loans",
            active: router.split("/")[1] === "loans",
        },
        {
            name: "Compras",
            href: "/purchases",
            active: router.split("/")[1] === "purchases",
        },
        {
            name: "Proveedores",
            href: "/suppliers",
            active: router.split("/")[1] === "suppliers",
        },
        {
            name: "Divisas",
            href: "/currencies",
            active: router.split("/")[1] === "currencies",
        }
    ]

    return (
        <div className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark border-end" style={{ width: "280px" }}>
            <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"> <span className="fs-4">FerreZambrano</span> </a>
            <hr />

            <ul className="nav nav-pills flex-column mb-auto">
                {
                    items.map((item, index) => {
                        return (
                            <li className="nav-item" key={index}>
                                <a href={item.href} className={`nav-link ${item.active ? "active" : "text-white"}`} aria-current="page">
                                    {item.name}
                                </a>
                            </li>
                        )
                    })
                }
            </ul>

            <hr />
            <div className="dropdown">
                <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2" /> <strong>mdo</strong> </a>
                <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
                    <li>
                        <a className="dropdown-item" href="#">New project...</a></li>
                    <li>
                        <a className="dropdown-item" href="#">Settings</a></li>
                    <li>
                        <a className="dropdown-item" href="#">Profile</a></li>
                    <li>
                        <hr className="dropdown-divider" /></li>
                    <li>
                        <a className="dropdown-item" href="#">Sign out</a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar