<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class TaskController extends Controller
{
    public function index()
    {
        return Task::all()->toArray();
    }

    public function store(Request $request)
    {
        $task = new Task([
            'name' => $request->input('name'),
            'description' => $request->input('description'),
        ]);
        $task->save();

        return response()->json($task);
    }

    public function update(Request $request, $id)
    {
        $task = Task::findOrFail($id);
        $task->name = $request->name;
        $task->description = $request->description;
        $task->save();

        return response()->json($task);
    }
    public function destroy($id)
    {
        $task = Task::find($id);
        $task->delete();

        return response()->json('Task deleted');
    }
}
