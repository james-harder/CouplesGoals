using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CouplesGoals.api.Models;
using CouplesGoals.api.Data;    

namespace CouplesGoals.api.Controllers {

    [Route("/api/[controller]")]
    [ApiController]
    public class GoalController : ControllerBase {

        private readonly GoalContext _context;

        public GoalController( GoalContext context ) {

            _context = context;
            
            if ( _context.Goals.Count() == 0 ) {
                _context.Goals.Add( new Goal { Name = "Get started by changing this goal, or add a new goal!",IsCompleted = false } );
                _context.SaveChanges();
            }
        }

        //GET: api/goal
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Goal>>> GetGoal() {

            return await _context.Goals.ToListAsync();

        } 

        //GET: api/goal/Id
        [HttpGet("{id}")]
        public async Task<ActionResult<Goal>> GetGoal( int id ) {

            var goal = await _context.Goals.FindAsync(id);

            if ( goal != null ) {
                return goal;
            } else {
                return NotFound();
            }
        }

        //POST: api/goal
        [HttpPost]
        public async Task<ActionResult<Goal>> PostGoal( Goal goal ) {

            _context.Goals.Add( goal );
            await _context.SaveChangesAsync();

            return CreatedAtAction( nameof( GetGoal ), new { id = goal.GoalId }, goal );

        }

        //PUT: api/goal/Id
        [HttpPut("{goalId}")]
        public async Task<ActionResult<Goal>> PutGoal( int goalId, Goal goal ) {

            if( goalId != goal.GoalId ) {

                return BadRequest();

            }

            _context.Entry(goal).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            
            return goal;

        }

        //DELETE: api/goal/Id
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGoal( int id ) {

            Goal goal = await _context.Goals.FindAsync( id );

            if( goal == null ) {

                return NotFound();
                
            }

            _context.Goals.Remove( goal );
            await _context.SaveChangesAsync();

            return NoContent();

        }
    }
}
