import React, {useState} from "react";
import axios from "axios";

const Account = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const handleSubmit = async(e) => {
        e.preventDefault();
        const user = {email, password, name};
        try {
            const res = await axios.post("api/v1/account", user);
            console.log(res.data + "ddd");
            console.info(res.data + "zzz");
        }catch (err) {
            console.log(err);

        }
    };

    return(
        <div>
            <form onSubmit = {handleSubmit}>
                <input type = "email"
                       placeholder = "Email"
                       value = {email}
                       onChange={(e) => setEmail(e.target.value)}
                       required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <button type="submit">Account</button>
            </form>
        </div>
    );
};

export default Account;