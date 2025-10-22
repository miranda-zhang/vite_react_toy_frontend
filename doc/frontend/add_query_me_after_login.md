# Add query "me" after login
Adding a **Relay query to fetch `me`** right after a successful login.

## 🧠 Goal

After a successful login (`loginUser` mutation returns a JWT),
→ store the token,
→ then **run the `me` query** (Relay-compatible)
→ and use that to populate the user info (email, phoneNumber, etc.).

---

## ✅ 1. Add the `me` query in your component

At the top of your `Login.jsx`:

```tsx
import { graphql, useLazyLoadQuery, useRelayEnvironment } from 'react-relay';
import { fetchQuery } from 'relay-runtime';
```

Define your `me` query:

```tsx
const MeQuery = graphql`
  query LoginMeQuery {
    me {
      id
      email
      name
      phoneNumber
    }
  }
`;
```

---

## ✅ 2. Use Relay’s environment to fetch `me` after login

At the **top of your `Login` component**, right after your other hooks:

```tsx
const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({...});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  // ✅ add here
  const environment = useRelayEnvironment();

  const [loginMutation] = useMutation(LoginUserMutation);
  const [registerMutation] = useMutation(RegisterUserMutation);
```
  
Inside your `handleSubmit`, in the **login success** section:

Find this part:

```tsx
if (response.loginUser) {
  login(
    { email: formData.email },
    response.loginUser
  );
}
```

Replace it with this:

```tsx
if (response.loginUser) {
// Save token for Relay environment
localStorage.setItem('authToken', response.loginUser);

// Update auth context with a placeholder user if needed
login({ email: formData.email }, response.loginUser);

// Now fetch the full user info
fetchQuery(environment, MeQuery, {})
    .toPromise()
    .then((userData) => {
    if (userData?.me) {
        // Replace context with full user info
        login(userData.me, response.loginUser);
    }
    })
    .catch((err) => console.error('Error fetching user details:', err));
}
```

✅ `fetchQuery` directly uses your Relay environment (so it includes the token from your network layer automatically).

---

## ✅ 3. Make sure your token is stored **before** the query

In your `useAuth` context, ensure `login()` saves the token to `localStorage` (or similar) **before** the `fetchQuery` runs.

Example `AuthContext` snippet:

```tsx
const login = (user, token) => {
  localStorage.setItem('token', token);
  setUser(user);
};
```

That way, Relay will automatically include it in the `Authorization` header (via your `RelayEnvironment` setup).

---

## ✅ 4. Optional – store the fetched user in context

You can modify your `login` call like this after fetching `me`:

```tsx
login(userData.me, response.loginUser);
```

So your context now holds the real user object from the backend, including the phone number.

---

## ✅ 5. Final result

Here’s the complete key change:

```tsx
onCompleted: (response, errors) => {
    setLoading(false);
    if (errors) {
    setError(errors[0].message);
    return;
    }

    if (response.loginUser) {
    // Save token for Relay environment
    localStorage.setItem('authToken', response.loginUser);

    // Update auth context with a placeholder user if needed
    login({ email: formData.email }, response.loginUser);

    // Now fetch the full user info
    fetchQuery(environment, MeQuery, {})
        .toPromise()
        .then((userData) => {
        if (userData?.me) {
            // Replace context with full user info
            login(userData.me, response.loginUser);
        }
        })
        .catch((err) => console.error('Error fetching user details:', err));
    }


},
```

---

## 🧾 Summary

| Step | Action                                                 |
| ---- | ------------------------------------------------------ |
| 1    | Define `MeQuery` with `me { id email phoneNumber }`    |
| 2    | Use `fetchQuery(environment, MeQuery, {})` after login |
| 3    | Store token before querying                            |
| 4    | Update auth context with fetched user                  |
| 5    | Use `data.me` everywhere else (e.g. Dashboard)         |

---
