function PasswordChangeError() {

    return (
        <div className="alert alert-danger" role="alert">
            Invalid password. Password must contain at least 8 characters from next categories:
            uppercase characters (A-Z), lowercase characters (a-z), digits (0-9), special characters (!?/#)
        </div>
    );
}

export default PasswordChangeError;