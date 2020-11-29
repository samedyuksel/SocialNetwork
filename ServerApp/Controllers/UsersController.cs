using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ServerApp.Data;
using ServerApp.DTO;
using ServerApp.Helpers;
using ServerApp.Models;

namespace ServerApp.Controllers
{
    [ServiceFilter(typeof(LastActiveActionFilter))]
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ISocialRepository _repository;
        private readonly IMapper _mapper;

        public UsersController(ISocialRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<IActionResult> GetUsers([FromQuery] UserQueryParams userParams)
        {
            // await Task.Delay(1000);
            userParams.UserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var users = await _repository.GetUsers(userParams);

            var result = _mapper.Map<IEnumerable<UserForListDTO>>(users);

            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _repository.GetUser(id);

            var result = _mapper.Map<UserForDetailsDTO>(user);

            return Ok(result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, UserForUpdateDTO model)
        {

            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return BadRequest("Not valid request");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var user = await _repository.GetUser(id);

            _mapper.Map(model, user);

            if (await _repository.SaveChanges())
            {
                return Ok();
            }
            throw new System.Exception("an error occurred during the update!");

        }

        [HttpPost("{followerUserId}/follow/{userId}")]
        public async Task<IActionResult> FollowUser(int followerUserId, int userId)
        {
            if (followerUserId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();


            if (followerUserId == userId)
                return BadRequest();

            var IsAlreadyFollowed = await _repository.IsAlreadyFollow(followerUserId, userId);

            if (IsAlreadyFollowed)
                return BadRequest("Already following!");

            if (await _repository.GetUser(userId) == null)
            {
                return NotFound();
            }

            var follow = new UserToUser()
            {
                UserId = userId,
                FollowerId = followerUserId
            };

            _repository.Add<UserToUser>(follow);

            if (await _repository.SaveChanges())
                return Ok();

            return BadRequest();
        }
    }
}