function Layout({ children }) {
    return (
        <div 
            style={{
                maxWidth: "1200px",
                margin: "0 auto",
                padding: "20px",
                fontFamily: "Inter, sans-serif"
            }}
            >
                {children}
            </div>
    );
}

export default Layout;