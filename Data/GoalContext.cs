using Microsoft.EntityFrameworkCore;
using CouplesGoals.api.Models;

namespace CouplesGoals.api.Data {

	public class GoalContext : DbContext {

		public GoalContext( DbContextOptions<GoalContext> options) : base(options) { }

		public DbSet<Goal> Goals { get; set; }

	}
}
