import {
  Box,
  Card,
  CardContent,
  Typography,
  Paper,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  IconButton,
  LinearProgress,
  Tooltip,
  Button,
  useTheme,
} from "@mui/material";
import {
  TrendingUp,
  People,
  MusicNote,
  Notifications,
  MoreVert,
  PlayArrow,
  Settings,
  Refresh,
} from "@mui/icons-material";
import { alpha } from "@mui/material/styles";
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

const StatCard = ({ title, value, icon, color, trend }: any) => {
  const theme = useTheme();
  return (
    <Card
      sx={{
        height: "100%",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: theme.shadows[8],
        },
        background: `linear-gradient(135deg, ${alpha(color, 0.1)} 0%, ${alpha(
          color,
          0.05
        )} 100%)`,
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography
              color="textSecondary"
              gutterBottom
              sx={{ fontWeight: 500 }}
            >
              {title}
            </Typography>
            <Typography
              variant="h4"
              component="div"
              sx={{ fontWeight: 600, mb: 1 }}
            >
              {value}
            </Typography>
            {trend && (
              <Typography
                variant="body2"
                sx={{
                  color: trend > 0 ? "success.main" : "error.main",
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                }}
              >
                <TrendingUp sx={{ fontSize: 16 }} />
                {trend}% from last month
              </Typography>
            )}
          </Box>
          <Avatar
            sx={{
              bgcolor: color,
              width: 56,
              height: 56,
              boxShadow: `0 0 20px ${alpha(color, 0.3)}`,
            }}
          >
            {icon}
          </Avatar>
        </Box>
      </CardContent>
    </Card>
  );
};

const RecentActivity = () => {
  const theme = useTheme();
  return (
    <Card
      sx={{
        height: "100%",
        transition: "transform 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
        },
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Recent Activity
          </Typography>
          <Tooltip title="More options">
            <IconButton size="small">
              <MoreVert />
            </IconButton>
          </Tooltip>
        </Box>
        <List>
          <ListItem sx={{ px: 0 }}>
            <ListItemAvatar>
              <Avatar
                sx={{
                  bgcolor: "primary.main",
                  boxShadow: `0 0 10px ${alpha(
                    theme.palette.primary.main,
                    0.3
                  )}`,
                }}
              >
                <MusicNote />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="New Audio File Processed"
              secondary="2 minutes ago"
              primaryTypographyProps={{ fontWeight: 500 }}
            />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem sx={{ px: 0 }}>
            <ListItemAvatar>
              <Avatar
                sx={{
                  bgcolor: "success.main",
                  boxShadow: `0 0 10px ${alpha(
                    theme.palette.success.main,
                    0.3
                  )}`,
                }}
              >
                <TrendingUp />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="System Performance Updated"
              secondary="15 minutes ago"
              primaryTypographyProps={{ fontWeight: 500 }}
            />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem sx={{ px: 0 }}>
            <ListItemAvatar>
              <Avatar
                sx={{
                  bgcolor: "warning.main",
                  boxShadow: `0 0 10px ${alpha(
                    theme.palette.warning.main,
                    0.3
                  )}`,
                }}
              >
                <Notifications />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="New User Registration"
              secondary="1 hour ago"
              primaryTypographyProps={{ fontWeight: 500 }}
            />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
};

const SystemStatusCard = ({ title, value, color }: any) => (
  <Box sx={{ mb: 2 }}>
    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
      <Typography sx={{ fontWeight: 500 }}>{title}</Typography>
      <Typography color={color} sx={{ fontWeight: 600 }}>
        {value}%
      </Typography>
    </Box>
    <LinearProgress
      variant="determinate"
      value={parseInt(value)}
      sx={{
        height: 8,
        borderRadius: 4,
        backgroundColor: alpha(color, 0.1),
        "& .MuiLinearProgress-bar": {
          backgroundColor: color,
        },
      }}
    />
  </Box>
);

const StatMiniCard = ({ icon, title, value, color }: any) => (
  <Card
    sx={{
      minWidth: 120,
      flex: 1,
      mx: 1,
      p: 1,
      display: "flex",
      alignItems: "center",
      boxShadow: 2,
      borderRadius: 2,
    }}
  >
    <Avatar sx={{ bgcolor: color, width: 40, height: 40, mr: 2 }}>
      {icon}
    </Avatar>
    <Box>
      <Typography
        variant="body2"
        color="textSecondary"
        sx={{ fontWeight: 500 }}
      >
        {title}
      </Typography>
      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        {value}
      </Typography>
    </Box>
  </Card>
);

const StatsRow = () => {
  const theme = useTheme();
  return (
    <Box sx={{ display: "flex", gap: 2, mb: 4, flexWrap: "wrap" }}>
      <StatMiniCard
        icon={<EmojiEventsIcon />}
        title="Reward Points"
        value="129,904"
        color={theme.palette.warning.main}
      />
      <StatMiniCard
        icon={<StarIcon />}
        title="XP"
        value="2,700"
        color={theme.palette.info.main}
      />
      <StatMiniCard
        icon={<LeaderboardIcon />}
        title="Global Rank"
        value="#152"
        color={theme.palette.primary.main}
      />
      <StatMiniCard
        icon={<WhatshotIcon />}
        title="Daily Streak"
        value="7 days"
        color={theme.palette.error.main}
      />
      <StatMiniCard
        icon={<MilitaryTechIcon />}
        title="Level"
        value="Pro"
        color={theme.palette.success.main}
      />
    </Box>
  );
};

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
        width: { xs: "100%", md: 260 },
        flexShrink: 0,
        mb: { xs: 3, md: 0 },
      }}
    >
      {/* Profile Card */}
      <Card
        sx={{
          mb: 2,
          p: 2,
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Avatar
          sx={{
            width: 64,
            height: 64,
            mb: 1,
            bgcolor: theme.palette.primary.main,
          }}
        >
          U
        </Avatar>
        <Typography variant="h6">User Name</Typography>
        <Typography variant="body2" color="textSecondary">
          Level 7 • Pro Member
        </Typography>
        <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
          <StarIcon color="info" fontSize="small" />
          <Typography variant="caption">XP: 2,700</Typography>
          <WhatshotIcon color="error" fontSize="small" />
          <Typography variant="caption">Streak: 7d</Typography>
        </Box>
      </Card>
      {/* Quick Links */}
      <Card sx={{ mb: 2, p: 2 }}>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Quick Links
        </Typography>
        <Button
          fullWidth
          startIcon={<PsychologyIcon />}
          variant="outlined"
          sx={{ mb: 1, textTransform: "none" }}
        >
          SkillScan
        </Button>
        <Button
          fullWidth
          startIcon={<LibraryMusicIcon />}
          variant="outlined"
          sx={{ mb: 1, textTransform: "none" }}
        >
          AudioMotor
        </Button>
        <Button
          fullWidth
          startIcon={<SchoolIcon />}
          variant="outlined"
          sx={{ mb: 1, textTransform: "none" }}
        >
          CourseDesigner
        </Button>
        <Button
          fullWidth
          startIcon={<LibraryMusicIcon />}
          variant="outlined"
          sx={{ mb: 1, textTransform: "none" }}
        >
          Library
        </Button>
        <Button
          fullWidth
          startIcon={<CloudUploadIcon />}
          variant="outlined"
          sx={{ mb: 1, textTransform: "none" }}
        >
          MixDrop
        </Button>
        <Button
          fullWidth
          startIcon={<SportsEsportsIcon />}
          variant="outlined"
          sx={{ textTransform: "none" }}
        >
          SoundBattles
        </Button>
      </Card>
      {/* Mini Skill Tree */}
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
  <Box sx={{ flex: 1, minWidth: 0, maxWidth: 700, mx: "auto" }}>
    {/* Welcome/Overview */}
    <Card
      sx={{
        mb: 3,
        p: 3,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
      }}
    >
      <Box>
        <Typography variant="h5" className="glow" sx={{ fontWeight: 700 }}>
          Welcome back, User!
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Level 7 • <span className="glow">2,700 XP</span> •{" "}
          <span className="glow">7-day streak</span>
        </Typography>
        <Typography variant="caption" color="primary">
          "Keep pushing your limits!"
        </Typography>
      </Box>
      <Avatar
        sx={{
          width: 56,
          height: 56,
          bgcolor: "primary.main",
          boxShadow: "0 0 16px #00BFFF",
        }}
      >
        U
      </Avatar>
    </Card>
    {/* Analytics/Stats Row */}
    <Box sx={{ mb: 3 }}>
      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
        <StatMiniCard
          icon={<EmojiEventsIcon />}
          title="Reward Points"
          value={<span className="glow">129,904</span>}
          color="#ffa000"
        />
        <StatMiniCard
          icon={<StarIcon />}
          title="XP"
          value={<span className="glow">2,700</span>}
          color="#0288d1"
        />
        <StatMiniCard
          icon={<LeaderboardIcon />}
          title="Global Rank"
          value={<span className="glow">#152</span>}
          color="#1976d2"
        />
        <StatMiniCard
          icon={<SchoolIcon />}
          title="Courses Done"
          value={<span className="glow">12</span>}
          color="#43a047"
        />
        <StatMiniCard
          icon={<MilitaryTechIcon />}
          title="Badges"
          value={<span className="glow">5</span>}
          color="#c62828"
        />
      </Box>
    </Box>
    {/* Recommendations */}
    <Card sx={{ mb: 3, p: 2 }}>
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        Recommended for You
      </Typography>
      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<PsychologyIcon />}
          className="glow"
        >
          Practice: EQ Challenge
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          startIcon={<SportsEsportsIcon />}
        >
          Join: SoundBattle
        </Button>
        <Button variant="outlined" color="success" startIcon={<SchoolIcon />}>
          Continue: Mixing Course
        </Button>
      </Box>
    </Card>
    {/* Activity Feed */}
    <Card sx={{ mb: 3, p: 2 }}>
      <Typography variant="subtitle2" sx={{ mb: 2 }}>
        Recent Activity
      </Typography>
      <Feed />
    </Card>
    {/* Quick Actions */}
    <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
      <Button
        variant="contained"
        color="primary"
        startIcon={<LibraryMusicIcon />}
        className="glow"
      >
        Start Training
      </Button>
      <Button
        variant="contained"
        color="secondary"
        startIcon={<CloudUploadIcon />}
      >
        Upload Mix
      </Button>
      <Button
        variant="contained"
        color="success"
        startIcon={<SportsEsportsIcon />}
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
      {/* Leaderboard */}
      <Card sx={{ mb: 2, p: 2 }}>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          AudioLeague Leaderboard
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Avatar sx={{ width: 28, height: 28, mr: 1 }}>A</Avatar>
            <Typography variant="body2">
              Alice <b>#1</b>
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Avatar sx={{ width: 28, height: 28, mr: 1 }}>B</Avatar>
            <Typography variant="body2">
              Bob <b>#2</b>
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Avatar sx={{ width: 28, height: 28, mr: 1 }}>C</Avatar>
            <Typography variant="body2">
              Charlie <b>#3</b>
            </Typography>
          </Box>
        </Box>
      </Card>
      {/* MentorX Widget */}
      <MentorXWidget />
      {/* Who to Follow */}
      <Card sx={{ mb: 2, p: 2 }}>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Who to follow
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Avatar sx={{ width: 28, height: 28, mr: 1 }}>D</Avatar>
            <Typography variant="body2">Diana</Typography>
            <Button
              size="small"
              variant="outlined"
              sx={{ ml: "auto", textTransform: "none" }}
            >
              Follow
            </Button>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Avatar sx={{ width: 28, height: 28, mr: 1 }}>E</Avatar>
            <Typography variant="body2">Eve</Typography>
            <Button
              size="small"
              variant="outlined"
              sx={{ ml: "auto", textTransform: "none" }}
            >
              Follow
            </Button>
          </Box>
        </Box>
      </Card>
      {/* Learning Progress */}
      <Card sx={{ p: 2 }}>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Learning Progress
        </Typography>
        <Box sx={{ mb: 1 }}>
          <Typography variant="body2">Mix & Mastering</Typography>
          <LinearProgress
            variant="determinate"
            value={19.4}
            sx={{ height: 8, borderRadius: 4, my: 1 }}
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
    <Box sx={{ p: { xs: 1, md: 3 }, maxWidth: 1600, mx: "auto" }}>
      <Box sx={{ display: { xs: "block", md: "flex" }, gap: 3 }}>
        <LeftPanel />
        <CenterPanel />
        <RightPanel />
      </Box>
    </Box>
  );
};

export default ControlRoom;
