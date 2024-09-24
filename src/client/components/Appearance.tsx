import {useEffect, useState} from "react";

function Appearance () {
    const [theme, setTheme] = useState<string>('light');

    function updateDocument (value: string) {
        document?.querySelector('html')?.setAttribute('data-theme', value);
    }

    useEffect(() => {
        const currentTheme = localStorage.getItem('theme') ?? 'light';
        setTheme(currentTheme);
        updateDocument(currentTheme);
    }, []);

    function toggle () {
        const newTheme = theme === "dark" ? "light" : "dark";
        updateDocument(newTheme);
        localStorage.setItem("theme", newTheme);
        setTheme(newTheme);
    }

    function renderIcon () {
        if (theme === 'light') {
            return (
                <>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" color={"currentColor"} fill={"none"}>
                        <path d="M21.5 14.0784C20.3003 14.7189 18.9301 15.0821 17.4751 15.0821C12.7491 15.0821 8.91792 11.2509 8.91792 6.52485C8.91792 5.06986 9.28105 3.69968 9.92163 2.5C5.66765 3.49698 2.5 7.31513 2.5 11.8731C2.5 17.1899 6.8101 21.5 12.1269 21.5C16.6849 21.5 20.503 18.3324 21.5 14.0784Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Dunkel
                </>
            );
        }
        return (
            <>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" color={"currentColor"}
                     fill={"none"}>
                    <path
                        d="M17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12Z"
                        stroke="currentColor" strokeWidth="1.5"/>
                    <path
                        d="M12 2V3.5M12 20.5V22M19.0708 19.0713L18.0101 18.0106M5.98926 5.98926L4.9286 4.9286M22 12H20.5M3.5 12H2M19.0713 4.92871L18.0106 5.98937M5.98975 18.0107L4.92909 19.0714"
                        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                Hell
            </>
        );
    }

    return (
        <button
            type="button"
            aria-label="Light/Darkmode"
            className="appearance"
            onClick={toggle}
        >{renderIcon()}</button>
    );
}

export default Appearance;