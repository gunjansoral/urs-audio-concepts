import {
  Box,
  Card,
  Typography,
  Avatar,
  LinearProgress,
  Button,
  useTheme,
  Container,
} from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import StarIcon from "@mui/icons-material/Star";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import SchoolIcon from "@mui/icons-material/School";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import TimelineIcon from "@mui/icons-material/Timeline";
import PsychologyIcon from "@mui/icons-material/Psychology";


const StatMiniCard = ({ icon, title, value, color }: any) => (
  <Card
    sx={{
      minWidth: 120,
      flex: 1,
      p: 2,
      display: "flex",
      alignItems: "center",
      boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
      borderRadius: 2,
      transition: "transform 0.2s, box-shadow 0.2s",
      "&:hover": {
        transform: "translateY(-2px)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
      },
    }}
  >
    <Avatar sx={{ bgcolor: color, width: 48, height: 48, mr: 2 }}>
      {icon}
    </Avatar>
    <Box>
      <Typography
        variant="body2"
        color="textSecondary"
        sx={{ fontWeight: 500, mb: 0.5 }}
      >
        {title}
      </Typography>
      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        {value}
      </Typography>
    </Box>
  </Card>
);

const MiniSkillTree = () => (
  <Card sx={{ p: 2, mb: 2 }}>
    <Typography variant="subtitle2" sx={{ mb: 1 }}>
      SkillStack Progress
    </Typography>
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <TimelineIcon color="primary" />
      <Box sx={{ flex: 1 }}>
        <LinearProgress
          variant="determinate"
          value={60}
          sx={{ height: 8, borderRadius: 4 }}
        />
        <Typography variant="caption" color="textSecondary">
          60% unlocked
        </Typography>
      </Box>
    </Box>
  </Card>
);

const LeftPanel = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        width: { xs: "100%", md: 280 },
        flexShrink: 0,
        mb: { xs: 3, md: 0 },
      }}
    >
      <Card
        sx={{
          mb: 2,
          p: 3,
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
          borderRadius: 2,
        }}
      >
        <Avatar
          sx={{
            width: 80,
            height: 80,
            mb: 2,
            bgcolor: theme.palette.primary.main,
            boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
          }}
        >
          U
        </Avatar>
        <Typography variant="h6" sx={{ mb: 0.5 }}>User Name</Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
          Level 7 • Pro Member
        </Typography>
        <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <StarIcon color="info" fontSize="small" />
            <Typography variant="caption">XP: 2,700</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <WhatshotIcon color="error" fontSize="small" />
            <Typography variant="caption">Streak: 7d</Typography>
          </Box>
        </Box>
      </Card>

      <Card 
        sx={{ 
          mb: 2, 
          p: 2.5,
          boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
          borderRadius: 2,
        }}
      >
        <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
          Quick Links
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Button
            fullWidth
            startIcon={<PsychologyIcon />}
            variant="outlined"
            sx={{ 
              textTransform: "none",
              py: 1,
              justifyContent: "flex-start",
              borderRadius: 1.5,
            }}
          >
            SkillScan
          </Button>
          <Button
            fullWidth
            startIcon={<LibraryMusicIcon />}
            variant="outlined"
            sx={{ 
              textTransform: "none",
              py: 1,
              justifyContent: "flex-start",
              borderRadius: 1.5,
            }}
          >
            AudioMotor
          </Button>
          <Button
            fullWidth
            startIcon={<SchoolIcon />}
            variant="outlined"
            sx={{ 
              textTransform: "none",
              py: 1,
              justifyContent: "flex-start",
              borderRadius: 1.5,
            }}
          >
            CourseDesigner
          </Button>
          <Button
            fullWidth
            startIcon={<LibraryMusicIcon />}
            variant="outlined"
            sx={{ 
              textTransform: "none",
              py: 1,
              justifyContent: "flex-start",
              borderRadius: 1.5,
            }}
          >
            Library
          </Button>
          <Button
            fullWidth
            startIcon={<CloudUploadIcon />}
            variant="outlined"
            sx={{ 
              textTransform: "none",
              py: 1,
              justifyContent: "flex-start",
              borderRadius: 1.5,
            }}
          >
            MixDrop
          </Button>
          <Button
            fullWidth
            startIcon={<SportsEsportsIcon />}
            variant="outlined"
            sx={{ 
              textTransform: "none",
              py: 1,
              justifyContent: "flex-start",
              borderRadius: 1.5,
            }}
          >
            SoundBattles
          </Button>
        </Box>
      </Card>

      <MiniSkillTree />
    </Box>
  );
};

const FeedPost = ({ user, time, content, image }: any) => (
  <Card sx={{ mb: 3, p: 2 }}>
    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
      <Avatar sx={{ mr: 2 }}>{user[0]}</Avatar>
      <Box>
        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
          {user}
        </Typography>
        <Typography variant="caption" color="textSecondary">
          {time}
        </Typography>
      </Box>
    </Box>
    <Typography variant="body1" sx={{ mb: image ? 2 : 0 }}>
      {content}
    </Typography>
    {image && (
      <Box sx={{ mb: 1 }}>
        <img
          src={image}
          alt="feed"
          style={{ width: "100%", borderRadius: 8 }}
        />
      </Box>
    )}
    <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
      <Button size="small" variant="text">
        Like
      </Button>
      <Button size="small" variant="text">
        Comment
      </Button>
      <Button size="small" variant="text">
        Share
      </Button>
    </Box>
  </Card>
);

const CreatePost = () => (
  <Card sx={{ mb: 3, p: 2 }}>
    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
      <Avatar sx={{ mr: 2 }}>U</Avatar>
      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
        What's on your mind?
      </Typography>
    </Box>
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Box
        component="textarea"
        placeholder="Share your thoughts, upload a mix, or ask for feedback..."
        sx={{
          width: "100%",
          minHeight: 100,
          p: 2,
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 1,
          resize: "none",
          fontFamily: "inherit",
          fontSize: "inherit",
          "&:focus": {
            outline: "none",
            borderColor: "primary.main",
          },
        }}
      />
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            size="small"
            startIcon={<CloudUploadIcon />}
            variant="outlined"
            sx={{ textTransform: "none" }}
          >
            Upload Audio
          </Button>
          <Button
            size="small"
            startIcon={<LibraryMusicIcon />}
            variant="outlined"
            sx={{ textTransform: "none" }}
          >
            Add Mix
          </Button>
        </Box>
        <Button variant="contained" color="primary">
          Post
        </Button>
      </Box>
    </Box>
  </Card>
);

const Feed = () => {
  // Dummy feed data
  const posts = [
    {
      user: "Miki Gag",
      time: "2 min ago",
      content:
        "Hi, need feedback for my mix! Check out the new audio file I uploaded.",
      image: "",
    },
    {
      user: "DJ Astrofreq",
      time: "1 hr ago",
      content:
        "Here is a new version of the track I am working on. Tamed the guitar and tried to balance levels.",
      image:
        "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80",
    },
    {
      user: "Alice",
      time: "3 hr ago",
      content: "Just reached 10,000 XP! Thanks for the support everyone!",
      image: "",
    },
  ];
  return (
    <Box>
      {posts.map((post, idx) => (
        <FeedPost key={idx} {...post} />
      ))}
    </Box>
  );
};

const CenterPanel = () => (
  <Box sx={{ flex: 1, minWidth: 0, maxWidth: 800, mx: "auto" }}>
    <Card
      sx={{
        mb: 3,
        p: 3,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
        borderRadius: 2,
      }}
    >
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
          Welcome back, User!
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
          Level 7 • <span>2,700 XP</span> •{" "}
          <span>7-day streak</span>
        </Typography>
        <Typography variant="caption" color="primary" sx={{ fontStyle: "italic" }}>
          "Keep pushing your limits!"
        </Typography>
      </Box>
      <Avatar
        sx={{
          width: 64,
          height: 64,
          bgcolor: "primary.main",
          boxShadow: "0 0 20px rgba(0,191,255,0.4)",
        }}
      >
        U
      </Avatar>
    </Card>

    <Box sx={{ 
      display: "grid", 
      gridTemplateColumns: {
        xs: "1fr",
        sm: "repeat(2, 1fr)",
        md: "repeat(3, 1fr)"
      },
      gap: 2,
      mb: 3 
    }}>
      <StatMiniCard
        icon={<EmojiEventsIcon />}
        title="Reward Points"
        value={<span>129,904</span>}
        color="#ffa000"
      />
      <StatMiniCard
        icon={<StarIcon />}
        title="XP"
        value={<span>2,700</span>}
        color="#0288d1"
      />
      <StatMiniCard
        icon={<LeaderboardIcon />}
        title="Global Rank"
        value={<span>#152</span>}
        color="#1976d2"
      />
      <StatMiniCard
        icon={<SchoolIcon />}
        title="Courses Done"
        value={<span>12</span>}
        color="#43a047"
      />
      <StatMiniCard
        icon={<MilitaryTechIcon />}
        title="Badges"
        value={<span>5</span>}
        color="#c62828"
      />
    </Box>

    <Card 
      sx={{ 
        mb: 3, 
        p: 2.5,
        boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
        borderRadius: 2,
      }}
    >
      <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
        Recommended for You
      </Typography>
      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<PsychologyIcon />}
          className="glow"
          sx={{ 
            borderRadius: 2,
            px: 3,
            py: 1,
          }}
        >
          Practice: EQ Challenge
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          startIcon={<SportsEsportsIcon />}
          sx={{ 
            borderRadius: 2,
            px: 3,
            py: 1,
          }}
        >
          Join: SoundBattle
        </Button>
        <Button 
          variant="outlined" 
          color="success" 
          startIcon={<SchoolIcon />}
          sx={{ 
            borderRadius: 2,
            px: 3,
            py: 1,
          }}
        >
          Continue: Mixing Course
        </Button>
      </Box>
    </Card>

    <Card 
      sx={{ 
        mb: 3, 
        p: 2.5,
        boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
        borderRadius: 2,
      }}
    >
      <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
        Recent Activity
      </Typography>
      <CreatePost />
      <Feed />
    </Card>

    <Box sx={{ display: "flex", gap: 2, mb: 2, flexWrap: "wrap" }}>
      <Button
        variant="contained"
        color="primary"
        startIcon={<LibraryMusicIcon />}
        className="glow"
        sx={{ 
          borderRadius: 2,
          px: 4,
          py: 1.5,
        }}
      >
        Start Training
      </Button>
      <Button
        variant="contained"
        color="secondary"
        startIcon={<CloudUploadIcon />}
        sx={{ 
          borderRadius: 2,
          px: 4,
          py: 1.5,
        }}
      >
        Upload Mix
      </Button>
      <Button
        variant="contained"
        color="success"
        startIcon={<SportsEsportsIcon />}
        sx={{ 
          borderRadius: 2,
          px: 4,
          py: 1.5,
        }}
      >
        Join Battle
      </Button>
    </Box>
  </Box>
);

const MentorXWidget = () => (
  <Card sx={{ mb: 2, p: 2 }}>
    <Typography variant="subtitle2" sx={{ mb: 1 }}>
      MentorX (AI Mentor)
    </Typography>
    <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
      Ask anything about audio, mixing, or your progress!
    </Typography>
    <Button variant="outlined" fullWidth startIcon={<PsychologyIcon />}>
      Chat with MentorX
    </Button>
  </Card>
);

const RightPanel = () => {
  return (
    <Box
      sx={{
        width: { xs: "100%", md: 300 },
        flexShrink: 0,
        mb: { xs: 3, md: 0 },
      }}
    >
      <Card 
        sx={{ 
          mb: 2, 
          p: 2.5,
          boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
          borderRadius: 2,
        }}
      >
        <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
          AudioLeague Leaderboard
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Avatar sx={{ width: 32, height: 32, mr: 1 }}>A</Avatar>
            <Typography variant="body2">
              Alice <b>#1</b>
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Avatar sx={{ width: 32, height: 32, mr: 1 }}>B</Avatar>
            <Typography variant="body2">
              Bob <b>#2</b>
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Avatar sx={{ width: 32, height: 32, mr: 1 }}>C</Avatar>
            <Typography variant="body2">
              Charlie <b>#3</b>
            </Typography>
          </Box>
        </Box>
      </Card>

      <MentorXWidget />

      <Card 
        sx={{ 
          mb: 2, 
          p: 2.5,
          boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
          borderRadius: 2,
        }}
      >
        <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
          Who to follow
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Avatar sx={{ width: 32, height: 32, mr: 1 }}>D</Avatar>
            <Typography variant="body2">Diana</Typography>
            <Button
              size="small"
              variant="outlined"
              sx={{ 
                ml: "auto", 
                textTransform: "none",
                borderRadius: 1.5,
              }}
            >
              Follow
            </Button>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Avatar sx={{ width: 32, height: 32, mr: 1 }}>E</Avatar>
            <Typography variant="body2">Eve</Typography>
            <Button
              size="small"
              variant="outlined"
              sx={{ 
                ml: "auto", 
                textTransform: "none",
                borderRadius: 1.5,
              }}
            >
              Follow
            </Button>
          </Box>
        </Box>
      </Card>

      <Card 
        sx={{ 
          p: 2.5,
          boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
          borderRadius: 2,
        }}
      >
        <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
          Learning Progress
        </Typography>
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>Mix & Mastering</Typography>
          <LinearProgress
            variant="determinate"
            value={19.4}
            sx={{ 
              height: 8, 
              borderRadius: 4, 
              mb: 1,
              backgroundColor: "rgba(0,0,0,0.08)",
              "& .MuiLinearProgress-bar": {
                borderRadius: 4,
              }
            }}
          />
          <Typography variant="caption" color="textSecondary">
            19.4% completed
          </Typography>
        </Box>
      </Card>
    </Box>
  );
};

const ControlRoom = () => {
  return (
    <Container maxWidth="xl" sx={{ py: { xs: 2, md: 4 } }}>
      <Box sx={{ display: { xs: "block", md: "flex" }, gap: 3 }}>
        <LeftPanel />
        <CenterPanel />
        <RightPanel />
      </Box>
    </Container>
  );
};

export default ControlRoom;
