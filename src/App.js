import {
  AppBar,
  Box,
  Button,
  Container,
  InputAdornment,
  TextField,
  Toolbar,
  Typography,
  ThemeProvider,
  useTheme,
  Modal,
  Checkbox,
  IconButton
} from "@mui/material";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import backgroundImage from "./landing_page_background.svg";
import Logo from "./Logo.svg";
import SignUpRightImage from "./signuprightimage1.svg";
import AccountCreatedImage from "./AccountCreatedImage.svg"
import OTPRightImage from "./OTPRightImage.svg"
import { Search, LocationOn, Business } from "@mui/icons-material";
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';

export default function Home() {
  const theme = useTheme();
  const [openSignUp, setOpenSignUp] = useState(false);
  const [openOTP, setOpenOTP] = useState(false);
  const [resendOTP, setResendOTP] = useState(false)
  const [accountcreated, setAccountCreated] = useState(false)
  const [login, setLogin] = useState(false)
  const [form, setForm] = useState({ email: "", password: "", confirmPassword: "", agree: false });
  const [errors, setErrors] = useState({});

  const handleSubmit = () => {
    let newErrors = {};

    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!form.password.trim()) {
      newErrors.password = "Password is required.";
    } else if (form.password.length < 8) {
      newErrors.password = "Password must have at least 8 characters.";
    }

    if (!form.confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    if (!form.agree) {
      newErrors.agree = "You must agree to the terms.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // alert("Form submitted successfully!");
      setOpenSignUp(false);
      setOpenOTP(true);
    }
  };

  const resendOTP1 = () => {
    let newErrors = {};

    if (Object.keys(newErrors).length === 0) {
      // alert("Form submitted successfully!");
      // setOpenSignUp(false);
      setOpenOTP(false);
      setResendOTP(true);
    }
  };

  const acccountcreated = () => {
    let newErrors = {};

    if (Object.keys(newErrors).length === 0) {
      // alert("Form submitted successfully!");
      // setOpenSignUp(false);
      setResendOTP(false);
      setAccountCreated(true);
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: "100vh", position: "relative", overflow: "hidden" }}>
        <Box
          sx={{
            position: "absolute",
            right: 0,
            top: 0,
            width: "90%",
            height: "100%",
            zIndex: -1,
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <AppBar position="static" elevation={0} sx={{ backgroundColor: "transparent" }}>
          <Container maxWidth="xl">
            <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Box component="img" alt="Logo" src={Logo} sx={{ height: 40, width: 300, objectFit: "contain" }} />
              </Box>
              <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
                {["Home", "Browse Jobs", "Find Job", "Employer", "Blog"].map((item) => (
                  <Button key={item} color="inherit" sx={{ color: "text.primary" }}>
                    {item}
                  </Button>
                ))}
                <Button variant="contained" sx={{ color: "black", backgroundColor: "white", borderRadius: 2 }} onClick={() => setOpenSignUp(true)}>
                  Sign Up
                </Button>
                <Button variant="contained" sx={{ borderRadius: 2, bgcolor: "#00A76F", "&:hover": { bgcolor: "#007867" } }} onClick={() => setLogin(true)}>
                  Login
                </Button>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>

        <Container maxWidth="xl" sx={{ mt: 8, display: "flex", flexDirection: "column", gap: 4 }}>
          <Box sx={{ maxWidth: "600px" }}>
            <Typography variant="h1" sx={{ fontSize: { xs: "2.5rem", md: "3.5rem" }, fontWeight: "bold", mb: 2, lineHeight: 1.2, mt: 15, ml: 5 }}>
              Find Your Dream Job with AI-Powered Recommendations
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
              Upload Your CV And Let Our AI Find The Best Matches For You
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                flexWrap: "wrap",
                p: 2,
                bgcolor: "background.paper",
                borderRadius: 2,
                boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
              }}
            >
              <TextField
                select
                label="Industry"
                SelectProps={{
                  native: true,
                }}
                sx={{ minWidth: 200 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Business />
                    </InputAdornment>
                  ),
                }}
              >
                <option value="">Select Industry</option>
                <option value="tech">Technology</option>
                <option value="health">Healthcare</option>
                <option value="finance">Finance</option>
              </TextField>

              <TextField
                placeholder="Location"
                sx={{ flex: 1, minWidth: 100 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOn />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                placeholder="Search Job"
                sx={{ flex: 1, minWidth: 100 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                variant="contained"
                size="large"
                sx={{
                  minWidth: 50,
                  bgcolor: "#00A76F",
                  "&:hover": {
                    bgcolor: "#007867",
                  },
                }}
              >
                Find Job
              </Button>
            </Box>
          </Box>
        </Container>

        {/* SignUp Modal */}
        <Modal open={openSignUp} onClose={() => setOpenSignUp(false)}>
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", position: "relative" }}>
            <IconButton
              onClick={() => setOpenSignUp(false)}
              sx={{ mt: 12, ml: 70, mr: -4, position: "absolute", top: "5px", right: "calc(50% - 400px)", bgcolor: "white", borderRadius: "50%", boxShadow: 1 }}
            >
              <CloseIcon />
            </IconButton>

            <Box sx={{ display: "flex", bgcolor: "white", borderRadius: 6, overflow: "hidden", maxWidth: 800, position: "relative" }}>
              <Box sx={{ padding: 4, width: "50%" }}>
                <Typography variant="h5" fontWeight="bold">Create Your Account</Typography>
                <Typography sx={{ fontSize: "0.9rem", color: "gray", mb: 3 }}>
                  To get started, create an account with us. It’s a quick and easy process that only takes a few minutes.
                </Typography>
                <TextField 
                  fullWidth 
                  label="Enter email address" 
                  value={form.email} 
                  onChange={(e) => setForm({...form, email: e.target.value})} 
                  error={!!errors.email} 
                  helperText={errors.email} 
                  sx={{ mb: 2 }} 
                />
                <TextField 
                  fullWidth 
                  label="Enter Password" 
                  type="password" 
                  value={form.password} 
                  onChange={(e) => setForm({ ...form, password: e.target.value })} 
                  error={!!errors.password} 
                  helperText={errors.password} 
                  sx={{ mb: 2 }} 
                />
                <TextField 
                  fullWidth 
                  label="Confirm Password"  
                  value={form.confirmPassword} 
                  onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} 
                  error={!!errors.confirmPassword} 
                  helperText={errors.confirmPassword}
                  type="password" 
                  sx={{ mb: 2 }} 
                />
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Checkbox 
                    checked={form.agree} 
                    onChange={(e) => setForm({ ...form, agree: e.target.checked })} 
                  />
                  <Typography variant="body2">
                    I agree to the <a href="#">Terms & Conditions</a> and <a href="#">Privacy Policy</a>
                  </Typography>
                </Box>
                {errors.agree && <Typography color="error">{errors.agree}</Typography>}

                <Button 
                  variant="contained" 
                  fullWidth 
                  sx={{ bgcolor: "#00A76F", "&:hover": { bgcolor: "#007867" }, mb: 2 }} 
                  onClick={handleSubmit}
                >
                  Create an account
                </Button>
                <Button variant="outlined" fullWidth>Sign in with Google</Button>
              </Box>
              <Box sx={{ width: "50%", bgcolor: "#E6F7F1", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Box component="img" src={SignUpRightImage} alt="Signup Illustration" sx={{ width: "100%", height: "100%", objectFit: "fill" }} />
              </Box>
            </Box>
          </Box>
        </Modal>

        {/* OTPPage 1 Modal */}
        <Modal open={openOTP} onClose={() => setOpenOTP(false)}>
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", position: "relative" }}>
            <IconButton
              onClick={() => setOpenSignUp(false)}
              sx={{ mt: 12, ml: 70, mr: -4, position: "absolute", top: "5px", right: "calc(50% - 400px)", bgcolor: "white", borderRadius: "50%", boxShadow: 1 }}
            >
              <CloseIcon />
            </IconButton>

            <Box sx={{ display: "flex", bgcolor: "white", borderRadius: 2, overflow: "hidden", maxWidth: 800, position: "relative" , borderRadius: 6}}>
              <Box sx={{ padding: 4, width: "50%" }}>
              <Typography variant="h5" fontWeight="bold">OTP Verification</Typography>
              <Typography sx={{ fontSize: "0.9rem", color: "gray", mb: 3 }}>
                Please enter the 6-digit verification code To 's123@gmail.com' . The Code is valid for 3 minutes
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "center", gap: 1, mb: 3 }}>
                {[...Array(6)].map((_, i) => (
                  <TextField key={i} sx={{ width: 40, textAlign: "center" , borderRadius: 17}} />
                ))}
              </Box>
              <Box sx={{display:"flex", fontSize: "0.9rem", color: "gray", mb: 3}}>
              <Typography sx={{ml:3.5, color: "#00A76F" }} style={{cursor:"pointer"}} onClick={resendOTP1}>
                Resend 
              </Typography>
              <Typography sx={{ml:23}}>
                02:58 
              </Typography>
              </Box>
              <Button fullWidth variant="contained" sx={{ bgcolor: "#00A76F" }} onClick={acccountcreated}>Submit</Button>
              </Box>
              <Box sx={{ width: "50%", bgcolor: "#E6F7F1", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Box component="img" src={OTPRightImage} alt="Signup Illustration" sx={{ width: "100%", height: "100%", objectFit: "fill" }} />
              </Box>
            </Box>
          </Box>
        </Modal>


          {/* Resend  Modal */}
        <Modal open={resendOTP} onClose={() => setOpenOTP(resendOTP)}>
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", position: "relative" }}>
            <IconButton
              onClick={() => resendOTP(false)}
              sx={{ mt: 12, ml: 70, mr: -4, position: "absolute", top: "5px", right: "calc(50% - 400px)", bgcolor: "white", borderRadius: "50%", boxShadow: 1 }}
            >
              <CloseIcon />
            </IconButton>

            <Box sx={{ display: "flex", bgcolor: "white", borderRadius: 2, overflow: "hidden", maxWidth: 800, position: "relative" , borderRadius: 6}}>
              <Box sx={{ padding: 4, width: "50%" }}>
              <Typography variant="h5" fontWeight="bold">OTP Verification</Typography>
              <Typography sx={{ fontSize: "0.9rem", color: "gray", mb: 3 }}>
                Please enter the 6-digit verification code To 's123@gmail.com' . The Code is valid for 3 minutes
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "center", gap: 1, mb: 3 }}>
                {[...Array(6)].map((_, i) => (
                  <TextField key={i} sx={{ width: 40, textAlign: "center" , borderRadius: 17}} />
                ))}
              </Box>
              <Box sx={{display:"flex", fontSize: "0.9rem", color: "gray", mb: 3}}>
              <Typography sx={{ml:3.5, color: "#00A76F" }}>
                Resend 
              </Typography>
              <Typography sx={{ml:23}}>
                02:58 
              </Typography>
              </Box>
              <Button fullWidth variant="contained" sx={{ bgcolor: "#00A76F" }} onClick={acccountcreated}>Submit</Button>
              <Button fullWidth variant="contained" sx={{ mt: 1,bgcolor: "#33B58A" }}>OTP resend successfully</Button>
              </Box>
              <Box sx={{ width: "50%", bgcolor: "#E6F7F1", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Box component="img" src={OTPRightImage} alt="Signup Illustration" sx={{ width: "100%", height: "100%", objectFit: "fill" }} />
              </Box>
            </Box>
          </Box>
        </Modal>
        

         {/* Account Created Modal */}
        <Modal open={accountcreated} onClose={() => accountcreated(false)}>
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", position: "relative" }}>
            <IconButton
              onClick={() => accountcreated(false)}
              sx={{ mt: 12, ml: 70, mr: -4, position: "absolute", top: "5px", right: "calc(50% - 400px)", bgcolor: "white", borderRadius: "50%", boxShadow: 1 }}
            >
              <CloseIcon />
            </IconButton>

            <Box sx={{ display: "flex", bgcolor: "white", borderRadius: 6, overflow: "hidden", maxWidth: 800, position: "relative" }}>
              <Box sx={{ padding: 4, width: "50%" }}>
                <Typography variant="h5" fontWeight="bold" sx={{ml:7, mt:3}}>Account Created</Typography>
                <Typography sx={{ fontSize: "0.9rem", color: "gray", mb: 3 , mt:1, ml:3}}>
                  Your account has been created successfully.
                </Typography>
                <Typography
               
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="end">
                      < CheckCircleTwoToneIcon/>
                    </InputAdornment>
                  ),
                }}
                />
                <Typography variant="h5" fontWeight="bold" sx={{mt:29, ml:5}}>Complete Your Profile</Typography>
                <Button fullWidth variant="contained" sx={{ fontSize: "0.9rem", bgcolor: "#D3D3D3",color:"black", mt:2 }} onClick={acccountcreated}>Upload your CV/Resume</Button>
                <Button fullWidth variant="contained" sx={{ bgcolor: "#D3D3D3",color:"black", mt:2 }} onClick={acccountcreated}>Create your CV/Resume</Button>
                
                {/* <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Checkbox 
                    checked={form.agree} 
                    onChange={(e) => setForm({ ...form, agree: e.target.checked })} 
                  />
                  
                </Box> */}
                {errors.agree && <Typography color="error">{errors.agree}</Typography>}

                
              </Box>
              <Box sx={{ width: "50%", bgcolor: "#E6F7F1", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Box component="img" src={AccountCreatedImage} alt="Signup Illustration" sx={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </Box>
            </Box>
          </Box>
        </Modal>

         {/* Login Modal */}
        <Modal open={login} onClose={() => setLogin(false)}>
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", position: "relative" }}>
            <IconButton
              onClick={() => setLogin(false)}
              sx={{ mt: 12, ml: 70, mr: -4, position: "absolute", top: "5px", right: "calc(50% - 400px)", bgcolor: "white", borderRadius: "50%", boxShadow: 1 }}
            >
              <CloseIcon />
            </IconButton>

            <Box sx={{ display: "flex", bgcolor: "white", borderRadius: 6, overflow: "hidden", maxWidth: 800, position: "relative" }}>
              <Box sx={{ padding: 4, width: "50%" }}>
                <Typography variant="h5" fontWeight="bold">Login Now</Typography>
                <Typography sx={{ fontSize: "0.9rem", color: "gray", mb: 3 }}>
                  To get started, create an account with us. It’s a quick and easy process that only takes a few minutes.
                </Typography>
                <TextField 
                  fullWidth 
                  label="Enter email address" 
                  value={form.email} 
                  onChange={(e) => setForm({...form, email: e.target.value})} 
                  error={!!errors.email} 
                  helperText={errors.email} 
                  sx={{ mb: 2 }} 
                />
                <TextField 
                  fullWidth 
                  label="Enter Password" 
                  type="password" 
                  value={form.password} 
                  onChange={(e) => setForm({ ...form, password: e.target.value })} 
                  error={!!errors.password} 
                  helperText={errors.password} 
                  sx={{ mb: 2 }} 
                />
                
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Checkbox 
                    checked={form.agree} 
                    onChange={(e) => setForm({ ...form, agree: e.target.checked })} 
                  />
                  <Typography variant="body2">
                    Remember me
                  </Typography>
                </Box>
                {errors.agree && <Typography color="error">{errors.agree}</Typography>}

                <Button 
                  variant="contained" 
                  fullWidth 
                  sx={{ bgcolor: "#00A76F", "&:hover": { bgcolor: "#007867" }, mb: 2 }} 
                  onClick={handleSubmit}
                >
                  Login
                </Button>
                
                <Button variant="outlined" fullWidth>Sign in with Google</Button>
              </Box>
              <Box sx={{ width: "50%", bgcolor: "#E6F7F1", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Box component="img" src={SignUpRightImage} alt="Signup Illustration" sx={{ width: "100%", height: "100%", objectFit: "fill" }} />
              </Box>
            </Box>
          </Box>
        </Modal>

      </Box>
    </ThemeProvider>
  );
}
