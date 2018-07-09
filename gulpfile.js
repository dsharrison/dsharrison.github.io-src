var gulp = require("gulp");
var del = require("del");
var spawn = require("child_process").spawn;

gulp.task("copy", function() {
  // Clean the existing static directory
  del(["../prod/static"], { force: true });

  // Copy the production build to the adjacent production
  // git directory
  return gulp.src(["build/**/*"]).pipe(gulp.dest("../prod/"));
});

gulp.task("prod-deploy", function(done) {
  // Invoke the gulp deploy from that directory
  return spawn("gulp", ["deploy"], { cwd: "../prod/", stdio: "inherit" }).on(
    "close",
    done
  );
});

// Main deploy task
gulp.task("deploy", gulp.series("copy", "prod-deploy"));
