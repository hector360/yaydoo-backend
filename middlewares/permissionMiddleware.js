

export const hasPermission = (level) => (req, res, next) => {
    try {
      if (level.includes(req.user.user_level)) {
        next();
      } else {
            return res.status(400).json({ message: "You don't have permission to access this route" });
      }
    } catch (error) {
        console.log(error);
    }
  };